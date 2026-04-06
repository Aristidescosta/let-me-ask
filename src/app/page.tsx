"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { BaseLayout } from "@/components/base-layout";
import { LetButton } from "@/components/ui/let-button";
import { Input } from "@/components/ui/input";

import { signInWithGoogle } from "@/app/repository/AuthRepository";
import { joinRoom } from "@/app/repository/RoomRepository";
import { requestNotificationPermission } from "@/app/firebase";
import { useAuth } from "@/app/states/useAuth";
import { ROOM_REF, ROUTE_ROOM, DEFAULT_ROOM_CODE } from "@/app/utils/constants";

export default function HomePage() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [roomCode, setRoomCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const handleSignIn = async () => {
    try {
      const googleUser = await signInWithGoogle();
      setUser({
        id: googleUser.uid,
        name: googleUser.displayName ?? "Utilizador",
        avatar: googleUser.photoURL,
      });
      await requestNotificationPermission();
    } catch {
      toast.error("Erro ao fazer login com o Google");
    }
  };

  const handleJoinRoom = async (code: string) => {
    if (!code.trim()) {
      toast.error("Informe o código da sala");
      return;
    }
    setIsJoining(true);
    try {
      const response = await joinRoom(ROOM_REF, code.trim());
      if (typeof response === "string") {
        toast.error(response);
      } else {
        router.push(ROUTE_ROOM(code.trim()));
      }
    } catch {
      toast.error("Erro ao entrar na sala");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <BaseLayout>
      <div className="w-full max-w-sm space-y-8">
        <Image src="/logo.svg" alt="Let Me Ask" width={150} height={40} priority />

        {!user ? (
          <LetButton title="Entrar com o Google" onClick={handleSignIn} />
        ) : (
          <p className="text-sm text-zinc-500">
            Olá, <span className="font-medium text-zinc-700 dark:text-zinc-300">{user.name}</span>!
          </p>
        )}

        <div className="flex items-center gap-4">
          <div className="flex-1 border-t border-zinc-200 dark:border-zinc-700" />
          <span className="text-sm text-zinc-400">ou entre numa sala</span>
          <div className="flex-1 border-t border-zinc-200 dark:border-zinc-700" />
        </div>

        <div className="space-y-3">
          <Input
            placeholder="Digite o código da sala"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleJoinRoom(roomCode)}
          />
          <LetButton
            title={isJoining ? "A entrar..." : "Entrar na sala"}
            isOutlined
            disabled={isJoining}
            onClick={() => handleJoinRoom(roomCode)}
          />
          <LetButton
            title="Sala de Feedback"
            isOutlined
            onClick={() => handleJoinRoom(DEFAULT_ROOM_CODE)}
          />
        </div>
      </div>
    </BaseLayout>
  );
}
