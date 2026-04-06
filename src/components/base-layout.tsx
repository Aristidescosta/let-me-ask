import Image from "next/image";
import type { ReactNode } from "react";

export function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="hidden md:flex md:w-1/2 flex-col items-center justify-center gap-8 bg-[#835afc] p-12 text-white">
        <Image src="/illustration.svg" alt="" width={320} height={320} priority />
        <div className="max-w-xs text-center">
          <h1 className="text-3xl font-bold">Cria salas de Q&amp;A ao vivo</h1>
          <p className="mt-3 text-purple-200">
            Tira as dúvidas da tua audiência em tempo real
          </p>
        </div>
      </aside>

      <main className="flex flex-1 flex-col items-center justify-center px-8 py-12">
        {children}
      </main>
    </div>
  );
}
