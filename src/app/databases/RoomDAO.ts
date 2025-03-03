import { DataSnapshot, child, get, push, update } from "firebase/database"
import { FirebaseError } from "firebase/app";

import { getDatabaseRef, } from "../firebase/database"
import { IQuestionType } from "../types/QuestionType";
import { IRoomType } from "../types/RoomType";

export const createRoomDAO = (roomReference: string, room: IRoomType): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    try {
      const ROOM_REF = getDatabaseRef(roomReference);

      push(ROOM_REF, room)
        .then((response => {
          resolve(response.key)
        }))
        .catch((reason: FirebaseError) => {
          console.log("Erro: " + reason)
          reject(reason)
        })
    } catch (error) {
      reject({ message: error as string });
    }
  });
};


export const joinRoomDAO = async (path: string): Promise<DataSnapshot | string> => {
  try {
    const ROOM_REF = getDatabaseRef();
    const snapshots = await get(child(ROOM_REF, path));

    if (!snapshots.exists()) {
      return "Ups, nenhuma sala encontrada para o código fornecido ou fechada pelo proprietário";
    }

    return snapshots.val().endedAt 
      ? "Esta sala já foi fechada" 
      : snapshots;

  } catch (error) {
    console.error("Erro ao buscar sala:", error);
    throw new Error("Ocorreu um erro ao tentar entrar na sala. Tente novamente.");
  }
};
 

export const createQuestionDAO = (roomReference: string, question: IQuestionType): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    try {
      const ROOM_REF = getDatabaseRef(roomReference);

      push(ROOM_REF, question)
        .then((response) => {
          resolve(response.key)
        })
        .catch((reason: FirebaseError) => {
          console.log("Erro: " + reason)
          reject(reason)
        })
    } catch (error) {
      reject({ message: error as string });
    }
  })
}

export const endRoomDAO = (roomReference: string, endedAt: Date): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const ROOM_REF = getDatabaseRef(roomReference)

      update(ROOM_REF, { endedAt: endedAt })
        .then(resolve)
        .catch((reason: FirebaseError) => {
          console.log("Erro: " + reason)
          reject(reason)
        })
    } catch (error) {
      reject({ message: error as string });
    }
  })
}