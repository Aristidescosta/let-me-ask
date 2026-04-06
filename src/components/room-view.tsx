"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ThumbsUp, LogOut, Moon, Sun, Trash2, CheckCircle, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { useRoom } from "@/app/states/useRoom";
import { useAuth } from "@/app/states/useAuth";
import { createQuestion } from "@/app/repository/RoomRepository";
import { likeQuestion, removeLikeQuestion, deleteQuestion, checkQuestionAsAnswered, highLightAnswered } from "@/app/repository/QuestionRepository";
import { endRoom } from "@/app/repository/RoomRepository";
import { signOut } from "@/app/repository/AuthRepository";
import { ROOM_REF, ROUTE_HOME, ROUTE_ADMIN_ROOM } from "@/app/utils/constants";

import { Question } from "@/components/ui/question";
import { RoomCode } from "@/components/ui/room-code";
import { ModalDelete } from "@/components/ui/modal-delete";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface RoomViewProps {
  roomId: string;
  isAdmin: boolean;
}

export function RoomView({ roomId, isAdmin }: RoomViewProps) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { user, setUser, setUserAdmin } = useAuth();
  const { questions, titleRoom, messageError } = useRoom(roomId);

  const [newQuestion, setNewQuestion] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<{ id: string; content: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const questionRef = (questionId: string) =>
    `/${ROOM_REF}/${roomId}/questions/${questionId}`;

  const likeRef = (questionId: string, likeId: string) =>
    `/${ROOM_REF}/${roomId}/questions/${questionId}/likes/${likeId}`;

  const handleCopyRoomCode = () => {
    navigator.clipboard.writeText(roomId);
    toast.success("Código copiado!");
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(undefined as never);
      setUserAdmin(false);
      router.push(ROUTE_HOME);
    } catch {
      toast.error("Erro ao sair");
    }
  };

  const handleSendQuestion = async () => {
    if (!newQuestion.trim()) return;
    if (!user) {
      toast.error("Faz login para enviar uma pergunta");
      return;
    }
    setIsSending(true);
    try {
      await createQuestion(`/${ROOM_REF}/${roomId}/questions`, {
        content: newQuestion.trim(),
        author: { name: user.name, avatar: user.avatar },
        isAnswered: false,
        isHighLigted: false,
      });
      setNewQuestion("");
    } catch {
      toast.error("Erro ao enviar a pergunta");
    } finally {
      setIsSending(false);
    }
  };

  const handleLike = async (questionId: string, likeId: string | undefined) => {
    if (!user) {
      toast.error("Faz login para gostar de uma pergunta");
      return;
    }
    try {
      if (likeId) {
        await removeLikeQuestion(likeRef(questionId, likeId));
      } else {
        await likeQuestion(`${questionRef(questionId)}/likes`, user.id);
      }
    } catch {
      toast.error("Erro ao registar gosto");
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteQuestion(questionRef(id));
      setQuestionToDelete(null);
      toast.success("Pergunta apagada");
    } catch {
      toast.error("Erro ao apagar a pergunta");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCheckAnswered = async (questionId: string) => {
    try {
      await checkQuestionAsAnswered(questionRef(questionId));
    } catch {
      toast.error("Erro ao marcar como respondida");
    }
  };

  const handleHighlight = async (questionId: string) => {
    try {
      await highLightAnswered(questionRef(questionId));
    } catch {
      toast.error("Erro ao destacar pergunta");
    }
  };

  const handleEndRoom = async () => {
    try {
      await endRoom(`/${ROOM_REF}/${roomId}`);
      toast.success("Sala encerrada");
      router.push(ROUTE_HOME);
    } catch {
      toast.error("Erro ao encerrar a sala");
    }
  };

  if (messageError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-500">{messageError}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Image src="/logo.svg" alt="Let Me Ask" width={120} height={32} />

          <div className="flex items-center gap-3">
            <RoomCode code={roomId} copyRoomCodeToClipboard={handleCopyRoomCode} />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label="Alternar tema"
            >
              {resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>

            {isAdmin ? (
              <Button
                variant="outline"
                size="sm"
                className="border-red-400 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                onClick={handleEndRoom}
              >
                Encerrar sala
              </Button>
            ) : (
              <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Sair">
                <LogOut className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
        {/* Room title */}
        <div className="mb-8 flex items-center gap-4">
          <h1 className="text-2xl font-bold">{titleRoom}</h1>
          {questions.length > 0 && (
            <span className="rounded-full bg-[#e559f9] px-4 py-1 text-sm font-medium text-white">
              {questions.length} pergunta{questions.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Question form — apenas para participantes */}
        {!isAdmin && (
          <form
            className="mb-8"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuestion();
            }}
          >
            <Textarea
              placeholder="O que queres perguntar?"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="min-h-[130px] resize-none"
            />
            <div className="mt-3 flex items-center justify-between">
              {user ? (
                <div className="flex items-center gap-2">
                  {user.avatar && (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {user.name}
                  </span>
                </div>
              ) : (
                <p className="text-sm text-zinc-500">
                  Faz{" "}
                  <button
                    type="button"
                    className="text-[#835afc] underline"
                    onClick={() => router.push(ROUTE_HOME)}
                  >
                    login
                  </button>{" "}
                  para enviar uma pergunta
                </p>
              )}
              <button
                type="submit"
                disabled={isSending || !newQuestion.trim()}
                className={cn(
                  "rounded-lg bg-[#835afc] px-6 py-2 text-sm font-medium text-white transition-opacity",
                  "disabled:cursor-not-allowed disabled:opacity-50 enabled:hover:opacity-90"
                )}
              >
                {isSending ? "A enviar..." : "Enviar pergunta"}
              </button>
            </div>
          </form>
        )}

        {/* Empty state */}
        {questions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Image src="/empty-questions.svg" alt="" width={160} height={160} />
            <h3 className="mt-6 text-xl font-bold">Nenhuma pergunta por aqui</h3>
            <p className="mt-2 text-sm text-zinc-500">
              {isAdmin
                ? "Partilha o código da sala para receber perguntas"
                : "Sê o primeiro a fazer uma pergunta!"}
            </p>
          </div>
        )}

        {/* Question list */}
        <div className="space-y-4">
          {questions.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighLigted={question.isHighLigted}
            >
              {isAdmin ? (
                <>
                  <button
                    onClick={() => handleCheckAnswered(question.id)}
                    className={cn(
                      "p-1.5 transition-colors",
                      question.isAnswered
                        ? "text-[#835afc]"
                        : "text-zinc-400 hover:text-[#835afc]"
                    )}
                    title="Marcar como respondida"
                  >
                    <CheckCircle className="size-5" />
                  </button>
                  <button
                    onClick={() => handleHighlight(question.id)}
                    className={cn(
                      "p-1.5 transition-colors",
                      question.isHighLigted
                        ? "text-[#e559f9]"
                        : "text-zinc-400 hover:text-[#e559f9]"
                    )}
                    title="Destacar pergunta"
                  >
                    <Zap className="size-5" />
                  </button>
                  <button
                    onClick={() =>
                      setQuestionToDelete({ id: question.id, content: question.content })
                    }
                    className="p-1.5 text-zinc-400 transition-colors hover:text-red-500"
                    title="Apagar pergunta"
                  >
                    <Trash2 className="size-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleLike(question.id, question.likeId)}
                  className={cn(
                    "flex items-center gap-1.5 p-1.5 text-sm transition-colors",
                    question.likeId
                      ? "text-[#835afc]"
                      : "text-zinc-400 hover:text-[#835afc]"
                  )}
                >
                  {question.likeCount > 0 && <span>{question.likeCount}</span>}
                  <ThumbsUp className="size-4" />
                </button>
              )}
            </Question>
          ))}
        </div>
      </main>

      {/* Modal de confirmação de apagar */}
      {questionToDelete && (
        <ModalDelete
          question={questionToDelete}
          isOpen={!!questionToDelete}
          onClose={() => setQuestionToDelete(null)}
          handleDeleteQuestion={handleDeleteQuestion}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
