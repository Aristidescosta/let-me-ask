import React, { useState } from "react";

import { useToastMessage } from "../../../chakra-ui-api/toast";
import { endRoom } from "../../../repository/RoomRepository";
import { useNavigateTo } from "../../../react-router-dom";
import { ROOM_REF } from "../../../utils/constants";
import {
  checkQuestionAsAnswered,
  highLightAnswered,
  removeLikeQuestion,
} from "../../../repository/QuestionRepository";
import { Room } from "../Room";

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
    checkQuestionAsAnswered(PATH).catch((error) => {
      const ERROR_MESSAGE =
        typeof error.message === "object"
          ? error.message.message
          : error.message;

      toastMessage({
        title: ERROR_MESSAGE,
        statusToast: ToastStatus.ERROR,
        position: "top-right",
      });
    });
  };

  const handleHighLightAnswered = (roomId: string, questionId: string) => {
    const PATH = `${ROOM_REF}/${roomId}/questions/${questionId}`;
    highLightAnswered(PATH).catch((error) => {
      const ERROR_MESSAGE =
        typeof error.message === "object"
          ? error.message.message
          : error.message;

      toastMessage({
        title: ERROR_MESSAGE,
        statusToast: ToastStatus.ERROR,
        position: "top-right",
      });
    });
  };

  const handleDeleteQuestion = (
    roomId: string,
    questionId: string
  ): Promise<string> => {
    return new Promise((resolve) => {
      const PATH = `${ROOM_REF}/${roomId}/questions/${questionId}`;
      setIsDeleting(true);
      removeLikeQuestion(PATH)
        .then(() => {
          resolve("Pergunta eliminada com sucesso");
        })
        .catch((error) => {
          const ERROR_MESSAGE =
            typeof error.message === "object"
              ? error.message.message
              : error.message;

          toastMessage({
            title: ERROR_MESSAGE,
            statusToast: ToastStatus.ERROR,
            position: "top-right",
          });
        })
        .finally(() => setIsDeleting(false));
    });
  };

  const handleEndRoom = (roomId: string): Promise<void> => {
    return new Promise((resolve) => {
      const PATH = `${ROOM_REF}/${roomId}`;
      setIsEndedRoom(true);
      endRoom(PATH)
        .then(() => {
          navigateTo("/");
          resolve;
        })
        .catch((error) => {
          const ERROR_MESSAGE =
            typeof error.message === "object"
              ? error.message.message
              : error.message;

          toastMessage({
            title: ERROR_MESSAGE,
            statusToast: ToastStatus.ERROR,
            position: "top-right",
          });
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
