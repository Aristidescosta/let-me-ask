import { push, remove, update } from "firebase/database"
import { getDatabaseRef } from "../firebase/database"
import { FirebaseError } from "firebase/app";

export const likeQuestionDAO = (questionReference: string, authorId: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    try {
      const ROOM_REF = getDatabaseRef(questionReference);

      push(ROOM_REF, { authorId })
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
  })
}


export const removeLikeQuestionDAO = (likeReference: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const ROOM_REF = getDatabaseRef(likeReference);

      remove(ROOM_REF)
        .then(resolve)
        .catch((reason) => {
          reject(reason)
        })
    } catch (error) {
      console.error("Erro: " + error)
      reject({ message: error as string });
    }
  })
}

export const removeQuestion = (likeReference: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const ROOM_REF = getDatabaseRef(likeReference);

      remove(ROOM_REF)
        .then(resolve)
        .catch((reason) => {
          reject(reason)
        })
    } catch (error) {
      console.error("Erro: " + error)
      reject({ message: error as string });
    }
  })
}

export const checkQuestionAsAnsweredDAO = (questionReference: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const ROOM_REF = getDatabaseRef(questionReference)

      update(ROOM_REF, { isAnswered: true })
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

export const highLightAnsweredDAO = (questionReference: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const ROOM_REF = getDatabaseRef(questionReference)

      update(ROOM_REF, { isHighLigted: true })
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