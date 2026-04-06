import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ReactNode } from "react";

interface QuestionProps {
  content: string;
  author: {
    name: string;
    avatar: string | null;
  };
  isAnswered?: boolean;
  isHighLigted?: boolean;
  children?: ReactNode;
}

export function Question({
  content,
  author,
  isAnswered = false,
  isHighLigted = false,
  children,
}: QuestionProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-6 shadow-sm",
        isHighLigted && !isAnswered
          ? "border border-[var(--brand)] bg-purple-50 dark:bg-purple-950/20"
          : isAnswered
          ? "bg-zinc-100 dark:bg-zinc-800"
          : "bg-white dark:bg-zinc-900"
      )}
    >
      <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-100">{content}</p>

      <footer className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {author.avatar ? (
            <Image
              src={author.avatar}
              alt={author.name}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="size-8 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          )}
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {author.name}
          </span>
        </div>

        {children && <div className="flex items-center gap-2">{children}</div>}
      </footer>
    </div>
  );
}
