"use client";

import { Copy } from "lucide-react";

interface RoomCodeProps {
  code: string;
  copyRoomCodeToClipboard: () => void;
}

export function RoomCode({ code, copyRoomCodeToClipboard }: RoomCodeProps) {
  return (
    <button
      onClick={copyRoomCodeToClipboard}
      className="flex h-10 cursor-pointer overflow-hidden rounded-lg border border-[var(--brand)] text-sm font-medium transition-opacity hover:opacity-80"
    >
      <div className="flex items-center justify-center bg-[var(--brand)] px-3">
        <Copy className="size-4 text-white" />
      </div>
      <span className="flex items-center px-4 text-zinc-700 dark:text-zinc-300">
        Sala #{code}
      </span>
    </button>
  );
}
