"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageSquare, Mic, MicOff, Send, Sparkles, Volume2, VolumeX, X } from "lucide-react";
import Image from "next/image";
import { site } from "@/data/site";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "What rooms do you have and prices?",
  "How do I book a room?",
  "What activities can I do near the hotel?",
  "I'd like to make a reservation",
];

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Welcome to Ridge Hotel! 🌿 I'm your AI concierge. Ask me anything about our rooms, experiences, dining, events, or local attractions — and I can help you make a booking right here.",
};

// Detect browser support for the Web Speech API.
const isSpeechRecognitionSupported =
  typeof window !== "undefined" &&
  ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
const isSpeechSynthesisSupported =
  typeof window !== "undefined" && "speechSynthesis" in window;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoRead, setAutoRead] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const hasOpenedRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const autoSendRef = useRef(false);
  const finalTranscriptRef = useRef("");
  const voiceModeRef = useRef(false);
  const isLoadingRef = useRef(false);
  const handleSendRef = useRef<(text?: string) => void>(() => {});
  const startListeningRef = useRef<() => void>(() => {});
  const isRestartingRef = useRef(false);

  // Keep refs in sync with state (avoids stale closures in async callbacks).
  useEffect(() => {
    voiceModeRef.current = voiceMode;
  }, [voiceMode]);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  // ---------- Scroll to bottom ----------
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, 0);
  }, []);

  // ---------- Voice output (text-to-speech) ----------
  const speak = useCallback(
    (text: string, index?: number, onEnd?: () => void) => {
      if (!isSpeechSynthesisSupported) return;

      // Strip any booking JSON or markdown-ish artifacts for cleaner speech.
      const clean = text
        .replace(/BOOKING_DATA:\s*\{[^}]*\}/g, "")
        .replace(/[*_#`]/g, "")
        .replace(/\s+/g, " ")
        .trim();
      if (!clean) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.pitch = 1;

      // Pick a natural-sounding English voice if available.
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find((v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("natural")) ||
        voices.find((v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("google")) ||
        voices.find((v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("samantha")) ||
        voices.find((v) => v.lang.startsWith("en"));
      if (preferred) utterance.voice = preferred;

      if (index !== undefined) setSpeakingIndex(index);
      setIsSpeaking(true);

      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeakingIndex(null);
        onEnd?.();
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setSpeakingIndex(null);
        onEnd?.();
      };

      window.speechSynthesis.speak(utterance);
    },
    []
  );

  const stopSpeaking = useCallback(() => {
    if (isSpeechSynthesisSupported) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setSpeakingIndex(null);
  }, []);

  // ---------- Voice input (speech-to-text) ----------
  const startListening = useCallback(() => {
    if (!isSpeechRecognitionSupported) {
      setVoiceError("Voice input isn't supported in this browser. Please try Chrome, Edge, or Safari.");
      setTimeout(() => setVoiceError(null), 4000);
      return;
    }

    stopSpeaking();
    setVoiceError(null);
    finalTranscriptRef.current = "";

    const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) return;

    const recognition = new SpeechRecognitionCtor();
    recognitionRef.current = recognition;

    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        finalTranscriptRef.current = finalTranscript;
      }

      // Show interim results live, but keep final results stable.
      setInput(finalTranscriptRef.current + interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);

      let message = "Voice input failed. Please try again.";
      switch (event.error) {
        case "no-speech":
          message = "No speech detected. Please try again.";
          break;
        case "audio-capture":
          message = "No microphone found. Please check your microphone.";
          break;
        case "not-allowed":
        case "service-not-allowed":
          message = "Microphone access was denied. Please allow microphone access in your browser settings.";
          break;
        case "network":
          message = "Network error. Please check your connection and try again.";
          break;
        case "aborted":
          return; // User cancelled, no error needed.
      }
      setVoiceError(message);
      setTimeout(() => setVoiceError(null), 4000);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;

      // Auto-send the final transcript once speech ends (like WhatsApp voice messages).
      const finalText = finalTranscriptRef.current.trim();
      if (finalText && autoSendRef.current) {
        autoSendRef.current = false;
        handleSendRef.current(finalText);
      } else if (voiceModeRef.current && !isRestartingRef.current) {
        // In voice mode, restart listening after a short delay to keep the loop going.
        // Use a guard flag to prevent overlapping restart calls.
        isRestartingRef.current = true;
        setTimeout(() => {
          isRestartingRef.current = false;
          if (voiceModeRef.current && !isLoadingRef.current) {
            autoSendRef.current = true;
            startListeningRef.current();
          }
        }, 800);
      }
    };

    recognition.start();
  }, [stopSpeaking]);

  const stopListening = useCallback(() => {
    isRestartingRef.current = false;
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);
  }, []);

  const handleMicClick = useCallback(() => {
    // In voice mode, the mic button stops the hands-free loop.
    if (voiceModeRef.current) {
      stopVoiceMode();
      return;
    }
    if (isListening) {
      // Stop and auto-send what was captured.
      autoSendRef.current = true;
      stopListening();
    } else {
      autoSendRef.current = true;
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // ---------- Send message ----------
  const handleSend = useCallback(
    async (text?: string) => {
      const content = (text ?? input).trim();
      if (!content || isLoadingRef.current) return;

      const userMsg: Message = { role: "user", content };
      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setInput("");
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextMessages }),
        });

        const data = await res.json();
        const reply = data.reply || "I'm sorry, I couldn't process that. Please try again.";

        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        scrollToBottom();

        // Auto-read the assistant reply if voice output is enabled OR voice mode is active.
        if (autoRead || voiceModeRef.current) {
          speak(reply, undefined, () => {
            // In voice mode, automatically start listening again after speaking.
            if (voiceModeRef.current) {
              setTimeout(() => {
                if (voiceModeRef.current && !isLoadingRef.current) {
                  autoSendRef.current = true;
                  startListeningRef.current();
                }
              }, 300);
            }
          });
        }
      } catch {
        scrollToBottom();
        const fallback = `I'm having trouble connecting. Please contact us directly on WhatsApp at ${site.contact.phoneDisplay} or email ${site.contact.reservationsEmail}.`;
        setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
        if (autoRead || voiceModeRef.current) {
          speak(fallback, undefined, () => {
            if (voiceModeRef.current) {
              setTimeout(() => {
                if (voiceModeRef.current && !isLoadingRef.current) {
                  autoSendRef.current = true;
                  startListeningRef.current();
                }
              }, 300);
            }
          });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [input, messages, autoRead, speak, scrollToBottom]
  );

  // Set refs to avoid circular dependencies between startListening and handleSend.
  useEffect(() => {
    handleSendRef.current = handleSend;
  }, [handleSend]);

  useEffect(() => {
    startListeningRef.current = startListening;
  }, [startListening]);

  // ---------- Voice mode (hands-free conversation loop) ----------
  const startVoiceMode = useCallback(() => {
    if (!isSpeechRecognitionSupported || !isSpeechSynthesisSupported) {
      setVoiceError(
        "Voice chat requires a browser with both speech recognition and speech synthesis support. Please try Chrome, Edge, or Safari."
      );
      setTimeout(() => setVoiceError(null), 5000);
      return;
    }

    voiceModeRef.current = true;
    setVoiceMode(true);
    setAutoRead(true); // Force auto-read in voice mode.
    setVoiceError(null);

    // Start listening after a short delay to let the UI update.
    setTimeout(() => {
      if (voiceModeRef.current) {
        autoSendRef.current = true;
        startListeningRef.current();
      }
    }, 300);
  }, []);

  const stopVoiceMode = useCallback(() => {
    voiceModeRef.current = false;
    setVoiceMode(false);
    stopListening();
    stopSpeaking();
  }, [stopListening, stopSpeaking]);

  // ---------- Toggle chat ----------
  const handleToggle = useCallback(() => {
    const next = !isOpen;
    setIsOpen(next);
    if (next) {
      setTimeout(() => inputRef.current?.focus(), 100);
      if (!hasOpenedRef.current) {
        hasOpenedRef.current = true;
        setMessages([WELCOME_MESSAGE]);
      }
    } else {
      stopVoiceMode();
      stopListening();
      stopSpeaking();
    }
    scrollToBottom();
  }, [isOpen, scrollToBottom, stopListening, stopSpeaking, stopVoiceMode]);

  // ---------- Speaker button ----------
  const handleSpeakerClick = useCallback(
    (index: number, content: string) => {
      if (speakingIndex === index) {
        stopSpeaking();
      } else {
        speak(content, index);
      }
    },
    [speakingIndex, speak, stopSpeaking]
  );

  // ---------- Cleanup on unmount ----------
  useEffect(() => {
    return () => {
      voiceModeRef.current = false;
      stopListening();
      stopSpeaking();
    };
  }, [stopListening, stopSpeaking]);

  // ---------- Load voices for speech synthesis (some browsers load async) ----------
  useEffect(() => {
    if (!isSpeechSynthesisSupported) return;
    // Warm up the voices list.
    window.speechSynthesis.getVoices();
    const handleVoicesChanged = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
  }, []);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={handleToggle}
        aria-label={isOpen ? "Close chat" : "Open chat assistant"}
        className="fixed bottom-6 right-6 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-forest-900 text-ivory-100 shadow-2xl shadow-forest-950/40 transition-all duration-300 hover:scale-105 hover:bg-forest-800 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-forest-950"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Chat panel */}
      {isOpen ? (
        <div className="fixed bottom-24 right-6 z-[80] flex h-[70vh] max-h-[580px] w-[calc(100vw-3rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-ivory-100/20 bg-forest-950/95 text-ivory-100 shadow-2xl shadow-forest-950/50 backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-ivory-100/10 px-5 py-4">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-ivory-100">
              <Image
                src="/images/logo.png"
                alt="Ridge Hotel logo"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-forest-950" />
            </div>
            <div className="flex-1">
              <p className="font-display text-base font-medium leading-tight">Ridge Concierge</p>
              <p className="text-[11px] text-ivory-100/60">
                {voiceMode ? "Voice chat active" : "AI assistant · Online"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {isSpeechSynthesisSupported ? (
                <button
                  onClick={() => setAutoRead((v) => !v)}
                  aria-label={autoRead ? "Disable auto-read replies" : "Enable auto-read replies"}
                  title={autoRead ? "Auto-read replies: on" : "Auto-read replies: off"}
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    autoRead ? "bg-gold-500 text-forest-950" : "bg-ivory-100/10 text-ivory-100/60 hover:text-ivory-100"
                  }`}
                >
                  {autoRead ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>
              ) : null}
              <Sparkles className="h-4 w-4 text-gold-400/70" />
            </div>
          </div>

          {/* Voice mode banner / Start Voice Chat button */}
          <div className="border-b border-ivory-100/10 px-4 py-2.5">
            {voiceMode ? (
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold-500" />
                  </span>
                  <p className="text-xs text-gold-300">
                    {isListening
                      ? "Listening… speak now"
                      : isLoading
                        ? "Thinking…"
                        : isSpeaking
                          ? "Speaking…"
                          : "Voice chat active"}
                  </p>
                </div>
                <button
                  onClick={stopVoiceMode}
                  className="flex items-center gap-1 rounded-full bg-ivory-100/10 px-2.5 py-1 text-[11px] text-ivory-100/80 transition-colors hover:bg-ivory-100/20 hover:text-ivory-100 focus:outline-none focus:ring-1 focus:ring-gold-400"
                >
                  <MicOff className="h-3 w-3" /> Stop
                </button>
              </div>
            ) : isSpeechRecognitionSupported && isSpeechSynthesisSupported ? (
              <button
                onClick={startVoiceMode}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-500/15 py-2 text-xs font-medium text-gold-300 transition-colors hover:bg-gold-500/25 focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                <Mic className="h-3.5 w-3.5" />
                Start Voice Chat — talk hands-free
              </button>
            ) : null}
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-md bg-gold-500 text-forest-950"
                      : "rounded-bl-md bg-ivory-100/10 text-ivory-100"
                  }`}
                >
                  {msg.content}
                  {msg.role === "assistant" && isSpeechSynthesisSupported ? (
                    <button
                      onClick={() => handleSpeakerClick(i, msg.content)}
                      aria-label={speakingIndex === i ? "Stop reading" : "Read message aloud"}
                      title={speakingIndex === i ? "Stop reading" : "Read message aloud"}
                      className={`mt-2 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] transition-colors focus:outline-none focus:ring-1 focus:ring-gold-400 ${
                        speakingIndex === i
                          ? "bg-gold-500 text-forest-950"
                          : "bg-ivory-100/10 text-ivory-100/70 hover:bg-ivory-100/20 hover:text-ivory-100"
                      }`}
                    >
                      {speakingIndex === i ? (
                        <>
                          <Volume2 className="h-3 w-3 animate-pulse" /> Reading…
                        </>
                      ) : (
                        <>
                          <Volume2 className="h-3 w-3" /> Listen
                        </>
                      )}
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
            {isLoading ? (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-ivory-100/10 px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gold-400" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gold-400" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gold-400" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            ) : null}
          </div>

          {/* Voice error message */}
          {voiceError ? (
            <div className="border-t border-red-500/30 bg-red-500/10 px-4 py-2">
              <p className="text-xs text-red-300">{voiceError}</p>
            </div>
          ) : null}

          {/* Listening indicator (only for one-off mic use, not voice mode) */}
          {isListening && !voiceMode ? (
            <div className="flex items-center justify-center gap-2 border-t border-ivory-100/10 bg-forest-900/60 px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
              </span>
              <p className="text-xs text-ivory-100/80">Listening… speak now</p>
            </div>
          ) : null}

          {/* Quick suggestions (only before first user message) */}
          {messages.filter((m) => m.role === "user").length === 0 ? (
            <div className="border-t border-ivory-100/10 px-4 py-3">
              <p className="mb-2 text-[10px] uppercase tracking-widest text-ivory-100/50">Try asking</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="rounded-full border border-ivory-100/20 bg-ivory-100/5 px-3 py-1.5 text-xs text-ivory-100/80 transition-colors hover:border-gold-400/50 hover:text-gold-300"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-ivory-100/10 px-4 py-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about rooms, pricing, experiences…"
              className="flex-1 rounded-full border border-ivory-100/15 bg-ivory-100/5 px-4 py-2.5 text-sm text-ivory-100 placeholder:text-ivory-100/40 focus:border-gold-400/50 focus:outline-none"
            />
            {isSpeechRecognitionSupported ? (
              <button
                type="button"
                onClick={handleMicClick}
                aria-label={isListening ? "Stop recording" : "Speak your message"}
                title={isListening ? "Stop recording" : "Speak your message"}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                  isListening
                    ? "animate-pulse bg-red-500 text-white"
                    : "bg-ivory-100/10 text-ivory-100/70 hover:bg-ivory-100/20 hover:text-ivory-100"
                }`}
              >
                <Mic className="h-4 w-4" />
              </button>
            ) : null}
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500 text-forest-950 transition-colors hover:bg-gold-400 focus:outline-none focus:ring-2 focus:ring-forest-950 focus:ring-offset-2 focus:ring-offset-forest-950 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}