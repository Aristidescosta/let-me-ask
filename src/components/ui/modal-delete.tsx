"use client";

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ModalDeleteProps {
  question: { id: string; content: string };
  isOpen: boolean;
  onClose: () => void;
  handleDeleteQuestion: (id: string) => void;
  isDeleting: boolean;
}

export function ModalDelete({
  question,
  isOpen,
  onClose,
  handleDeleteQuestion,
  isDeleting,
}: ModalDeleteProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Trash2 className="text-destructive" />
          </AlertDialogMedia>
          <AlertDialogTitle>Apagar pergunta</AlertDialogTitle>
          <AlertDialogDescription>
            Tens a certeza que queres apagar a pergunta:{" "}
            <span className="font-medium text-foreground">
              &ldquo;{question.content.slice(0, 80)}
              {question.content.length > 80 ? "..." : ""}&rdquo;
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} disabled={isDeleting}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive/10 text-destructive hover:bg-destructive/20"
            onClick={() => handleDeleteQuestion(question.id)}
            disabled={isDeleting}
          >
            {isDeleting ? "A apagar..." : "Apagar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
