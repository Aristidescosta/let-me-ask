import React, { useState } from "react";
import { Room } from "../Room";
import {
  checkQuestionAsAnswered,
  highLightAnswered,
  likeQuestion,
  removeLikeQuestion,
} from "../../../repository/QuestionRepository";
import { ROOM_REF } from "../../../utils/constants";
import { endRoom } from "../../../repository/RoomRepository";
import { useNavigateTo } from "../../../react-router-dom";
import { useToastMessage } from "../../../chakra-ui-api/toast";

export const AdminRoom: React.FC = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEndedRoom, setIsEndedRoom] = useState(false);
  const { toastMessage, ToastStatus } = useToastMessage();

  const { navigateTo } = useNavigateTo();

  const handleCheckQuestionAsAnswered = (
    roomId: string,
    questionId: string
  ) => {
    const PATH = `${ROOM_REF}/${roomId}/questions/${questionId}`;
    checkQuestionAsAnswered(PATH).catch(() => {
      toastMessage({
        title: "Houve um pequeno erro interno, tente novamente",
        statusToast: ToastStatus.WARNING,
        position: "top-right",
      });
    });
  };

  const handleHighLightAnswered = (roomId: string, questionId: string) => {
    const PATH = `${ROOM_REF}/${roomId}/questions/${questionId}`;
    highLightAnswered(PATH).catch(() => {
      toastMessage({
        title: "Houve um pequeno erro interno, tente novamente",
        statusToast: ToastStatus.WARNING,
        position: "top-right",
      });
    });
  };

  const handleDeleteQuestion = (
    roomId: string,
    questionId: string
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const PATH = `${ROOM_REF}/${roomId}/questions/${questionId}`;
      setIsDeleting(true);
      removeLikeQuestion(PATH)
        .then(() => {
          resolve("Pergunta eliminada com sucesso");
        })
        .catch((error) => {
          console.error(error);
          reject({ message: "Tivemos um erro interno, tente novamente!" });
        })
        .finally(() => setIsDeleting(false));
    });
  };

  const handleEndRoom = (roomId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const PATH = `${ROOM_REF}/${roomId}`;
      setIsEndedRoom(true);
      endRoom(PATH)
        .then(() => {
          navigateTo("/");
          resolve;
        })
        .catch((reason) => {
          console.log("erro");
          reject(reason);
        })
        .finally(() => setIsEndedRoom(false));
    });
  };

  return (
    <Room
      isAdmin
      handleDeleteQuestion={handleDeleteQuestion}
      isDeleting={isDeleting}
      handleEndRoom={handleEndRoom}
      isEndedRoom={isEndedRoom}
      handleHighLightAnswered={handleHighLightAnswered}
      handleCheckQuestionAsAnswered={handleCheckQuestionAsAnswered}
    />
  );
};
