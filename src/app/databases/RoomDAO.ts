import { DataSnapshot, child, get, push, update } from "firebase/database"
import { getDatabaseRef, } from "../firebase/database"
import { IRoomType } from "../types/RoomType";
import { IQuestionType } from "../types/QuestionType";

export const createRoomDAO = (roomReference: string, room: IRoomType): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    try {
      const ROOM_REF = getDatabaseRef(roomReference);

      push(ROOM_REF, room)
        .then((response => {
          resolve(response.key)
        }))
        .catch((reason) => {
          console.log("erro")
          resolve(reason.message)
        })
    } catch (error) {
      console.error("Erro: " + error)
      reject({ message: error as string });
    }
  });
};


export const joinRoomDAO = (path: string): Promise<DataSnapshot | string> => {
  return new Promise((resolve, reject) => {
    try {
      const ROOM_REF = getDatabaseRef()
      get(child(ROOM_REF, path))
        .then((snapshots) => {
          if (snapshots.exists()) {
            if (snapshots.val().endedAt) {
              resolve("Esta sala já foi fechada")
            } else resolve(snapshots)
          } else {
            resolve("Ups, nenhuma sala encontrada para o código fornecido")
          }
        })
    } catch (error) {
      console.error("Erro: " + error)
      reject({ message: "Tivemos um erro interno, tente novamente" })
    }
  })
}

export const createQuestionDAO = (roomReference: string, question: IQuestionType): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    try {
      const ROOM_REF = getDatabaseRef(roomReference);

      push(ROOM_REF, question)
        .then((response) => {
          resolve(response.key)
        })
        .catch((reason) => {
          console.log("erro")
          reject(reason)
        })
    } catch (error) {
      console.error("Erro: " + error)
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
        .catch((reason) => {
          console.log("erro")
          reject(reason)
        })
    } catch (error) {
      console.error("Erro: " + error)
      reject({ message: "Tivemos um erro interno, tente novamente" })
    }
  })
}