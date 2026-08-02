import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
}) {
  return <Tag className={cn("mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16", className)}>{children}</Tag>;
}
