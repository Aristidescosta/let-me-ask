"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { BaseLayout } from "@/components/base-layout";
import { LetButton } from "@/components/ui/let-button";
import { Input } from "@/components/ui/input";

import { createRoom } from "@/app/repository/RoomRepository";
import { useAuth } from "@/app/states/useAuth";
import { ROOM_REF, ROUTE_ADMIN_ROOM, ROUTE_HOME } from "@/app/utils/constants";

export default function NewRoomPage() {
  const router = useRouter();
  const { user, setUserAdmin } = useAuth();
  const [title, setTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  if (!user) {
    router.replace(ROUTE_HOME);
    return null;
  }

  const handleCreateRoom = async () => {
    if (!title.trim()) {
      toast.error("Adiciona um título à sala");
      return;
    }
    setIsCreating(true);
    try {
      const roomId = await createRoom(ROOM_REF, {
        title: title.trim(),
        authorId: user.id,
        questions: [],
      });
      setUserAdmin(true);
      router.push(ROUTE_ADMIN_ROOM(roomId));
    } catch {
      toast.error("Erro ao criar a sala");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <BaseLayout>
      <div className="w-full max-w-sm space-y-8">
        <Image src="/logo.svg" alt="Let Me Ask" width={150} height={40} priority />

        <div>
          <h2 className="text-2xl font-bold">Cria uma nova sala</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Partilha o código com a tua audiência
          </p>
        </div>

        <div className="space-y-3">
          <Input
            placeholder="Nome da sala"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreateRoom()}
          />
          <LetButton
            title={isCreating ? "A criar..." : "Criar sala"}
            disabled={isCreating}
            onClick={handleCreateRoom}
          />
          <LetButton
            title="Entrar numa sala existente"
            isOutlined
            onClick={() => router.push(ROUTE_HOME)}
          />
        </div>
      </div>
    </BaseLayout>
  );
}
