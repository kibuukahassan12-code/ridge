import { cn } from "@/lib/utils";

export default function Kicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("kicker divider-leaf text-gold-600", className)}>{children}</p>;
}
