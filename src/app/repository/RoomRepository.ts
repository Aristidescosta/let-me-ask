import { DataSnapshot } from "firebase/database";
import { createQuestionDAO, createRoomDAO, endRoomDAO, joinRoomDAO } from "../databases/RoomDAO";
import { IRoomType } from "../types/RoomType";
import { IQuestionType } from "../types/QuestionType";

export const createRoom = (roomReference: string, room: IRoomType): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      if (room.title.trim() === "") {
        resolve("Adicione um título a sala")
      } else {
        createRoomDAO(roomReference, room)
          .then(result => {
            if (result) {
              resolve(result)
            } else {
              reject({ message: "Erro ao criar a sala" })
            }
          })
          .catch(error => reject(error))
      }
    } catch (error) {
      reject
    }
  })
}

export const joinRoom = (roomReference: string, roomCode: string): Promise<DataSnapshot | string> => {
  return new Promise((resolve, reject) => {
    const PATH = `/${roomReference}/${roomCode}`
    joinRoomDAO(PATH)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => reject(error.message))
  })
}

export const createQuestion = (roomReference: string, question: IQuestionType): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      createQuestionDAO(roomReference, question)
        .then(result => {
          if (result) {
            resolve(result)
          } else {
            reject({ message: "Erro ao criar a pergunta" })
          }
        })
        .catch(error => reject(error.message))
    } catch (error) {
      console.error("Erro: " + error)
      reject({ message: error as string });
    }
  })
}

export const getAllQuestions = (roomReference: string, roomCode: string): Promise<DataSnapshot | string> => {
  return new Promise((resolve, reject) => {
    const PATH = `/${roomReference}/${roomCode}`
    joinRoomDAO(PATH)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => reject(error.message))
  })
}

export const endRoom = (roomReference: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const ENDED_AT = new Date()

      endRoomDAO(roomReference, ENDED_AT)
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