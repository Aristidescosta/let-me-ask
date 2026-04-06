import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

interface LetButtonProps extends ComponentProps<typeof Button> {
  title: string;
  isOutlined?: boolean;
}

export function LetButton({ title, isOutlined = false, className, ...props }: LetButtonProps) {
  return (
    <Button
      className={cn(
        "h-12 w-full rounded-lg text-sm font-medium transition-all",
        isOutlined
          ? "border border-[var(--brand)] bg-white text-[var(--brand)] hover:brightness-90 dark:bg-transparent"
          : "bg-[var(--brand)] text-white hover:brightness-90",
        className
      )}
      {...props}
    >
      {title}
    </Button>
  );
}
