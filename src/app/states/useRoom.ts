import { useEffect, useState } from "react";

import { getAllQuestions } from "../repository/RoomRepository";
import { IQuestionType } from "../types/QuestionType";
import { ROOM_REF } from "../utils/constants";
import { IUserType } from "../types/UserType";
import { useAuth } from "./useAuth";

type IFirebaseQuestions = Record<string, {
  author: Omit<IUserType, "id">
  content: string
  isAnswered: boolean
  isHighLigted: boolean
  likes: Record<string, {
    authorId: string
  }>
}>;

type TQuestionProps = IQuestionType & {
  id: string;
  likeCount: number;
  likeId: string | undefined;
};

export const useRoom = (roomId: string | undefined) => {
  const [titleRoom, setTitleRoom] = useState("");
  const [questions, setQuestions] = useState<TQuestionProps[]>([]);
  const [messageError, setMessageError] = useState<string | null>(null);

  const { user } = useAuth()

  useEffect(() => {
    if (roomId) {
      getAllQuestions(ROOM_REF, roomId).then((response) => {
        if (typeof response === "string") setMessageError(response + " ou fechada pelo proprietario");
        else {
          const databaseRoom = response.val();

          const firebaseQuestions: IFirebaseQuestions =
            databaseRoom.questions ?? {};

          const parseQuestions = Object.entries(firebaseQuestions).map(
            ([key, question]) => {
              return {
                id: key,
                author: question.author,
                content: question.content,
                isAnswered: question.isAnswered,
                isHighLigted: question.isHighLigted,
                likeCount: Object.values(question.likes ?? {}).length,
                likeId: Object.entries(question.likes ?? {}).find(([, like]) => like.authorId === user?.id)?.[0],
              };
            }
          );
          setQuestions(parseQuestions.reverse());
          setTitleRoom(databaseRoom.title);
        }
      });
    }
  }, [roomId, questions, user?.id]);

  return { questions, titleRoom, messageError }
}