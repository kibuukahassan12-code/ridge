"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, Sparkles, X } from "lucide-react";
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

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasWelcome, setHasWelcome] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!hasWelcome && isOpen) {
      setMessages([
        {
          role: "assistant",
          content:
            "Welcome to Ridge Hotel! 🌿 I'm your AI concierge. Ask me anything about our rooms, experiences, dining, events, or local attractions — and I can help you make a booking right here.",
        },
      ]);
      setHasWelcome(true);
    }
  }, [isOpen, hasWelcome]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  async function handleSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;

    const userMsg: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages.concat(userMsg);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json();
      const reply = data.reply || "I'm sorry, I couldn't process that. Please try again.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I'm having trouble connecting. Please contact us directly on WhatsApp at ${site.contact.phoneDisplay} or email ${site.contact.reservationsEmail}.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Open chat assistant"}
        className="fixed bottom-6 right-6 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-forest-900 text-ivory-100 shadow-2xl shadow-forest-950/40 transition-all duration-300 hover:scale-105 hover:bg-forest-800"
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
              <p className="text-[11px] text-ivory-100/60">AI assistant · Online</p>
            </div>
            <Sparkles className="h-4 w-4 text-gold-400/70" />
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
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500 text-forest-950 transition-colors hover:bg-gold-400 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}