import React, { useState } from "react";
import { Room } from "../Room";
import {
  likeQuestion,
  removeLikeQuestion,
} from "../../../repository/QuestionRepository";
import { ROOM_REF } from "../../../utils/constants";
import { useAuth } from "../../../states/useAuth";
import { useToastMessage } from "../../../chakra-ui-api/toast";

export const AdminRoom: React.FC = () => {
  const { user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toastMessage, ToastStatus } = useToastMessage();

  const handleLikeQuestion = (roomId: string, questionId: string) => {
    const PATH = `${ROOM_REF}/${roomId}/questions/${questionId}/likes`;
    if (user) {
      likeQuestion(PATH, user.id);
    }
  };

  const handleRemoveLikeQuestion = (
    roomId: string,
    questionId: string,
    likeId: string
  ) => {
    const PATH = `${ROOM_REF}/${roomId}/questions/${questionId}/likes/${likeId}`;
    setIsUpdating(true);
    removeLikeQuestion(PATH)
      .catch((error) => {
        console.error(error);
        toastMessage({
          title: "Tivemos um erro interno, tente novamente!",
          position: "top-right",
          statusToast: ToastStatus.ERROR,
        });
      })
      .finally(() => setIsUpdating(false));
  };

  const handleDeleteQuestion = (roomId: string, questionId: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const PATH = `${ROOM_REF}/${roomId}/questions/${questionId}`;
      setIsDeleting(true);
      removeLikeQuestion(PATH)
        .then(() => {
          resolve("Pergunta eliminada com sucesso");
        })
        .catch((error) => {
          console.error(error);/* 
          toastMessage({
            title: "Tivemos um erro interno, tente novamente!",
            position: "top-right",
            statusToast: ToastStatus.ERROR,
          }); */
          reject({message: "Tivemos um erro interno, tente novamente!"})
        })
        .finally(() => setIsDeleting(false));
    });
  };

  return (
    <Room
      isAdmin
      isUpdating={isUpdating}
      handleRemoveLikeQuestion={handleRemoveLikeQuestion}
      handleLikeQuestion={handleLikeQuestion}
      handleDeleteQuestion={handleDeleteQuestion}
      isDeleting={isDeleting}
    />
  );
};
