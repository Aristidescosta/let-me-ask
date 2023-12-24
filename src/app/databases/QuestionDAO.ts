import { push, remove } from "firebase/database"
import { getDatabaseRef } from "../firebase/database"

export const likeQuestionDAO = (questionReference: string, authorId: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    try {
      const ROOM_REF = getDatabaseRef(questionReference);

      push(ROOM_REF, { authorId })
        .then((response => {
          console.log(questionReference)
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