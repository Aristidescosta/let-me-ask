import { useEffect, useState } from "react";
import { getAllQuestions } from "../repository/RoomRepository";
import { ROOM_REF } from "../utils/constants";
import { IQuestionType } from "../types/QuestionType";

type IFirebaseQuestions = Record<string, IQuestionType>;

type TQuestionProps = IQuestionType & {
  id: string;
};

export const useRoom = (roomId: string | undefined) =>{
  const [titleRoom, setTitleRoom] = useState("");
  const [questions, setQuestions] = useState<TQuestionProps[]>([]);

  useEffect(() => {
    if (roomId) {
      getAllQuestions(ROOM_REF, roomId).then((response) => {
        if (typeof response === "string") console.log(response);
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
              };
            }
          );

          setQuestions(parseQuestions);
          setTitleRoom(databaseRoom.title);
        }
      });
    }
  }, [roomId, questions]);

  return { questions, titleRoom }
}