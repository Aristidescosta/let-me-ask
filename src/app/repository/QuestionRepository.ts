import { FirebaseError } from "firebase/app"
import { checkQuestionAsAnsweredDAO, highLightAnsweredDAO, likeQuestionDAO, removeLikeQuestionDAO, removeQuestion } from "../databases/QuestionDAO"

export const likeQuestion = (questionReference: string, authorId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      likeQuestionDAO(questionReference, authorId)
        .then((response) => {
          if (response) {
            resolve()
          }
          else reject({ message: "Erro ao concluir essa acção!" })
        })
        .catch((reason: FirebaseError) => {
          reject(reason)
        })
    } catch (error) {
      reject({ message: error as string });
    }
  })
}

export const removeLikeQuestion = (likeReference: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      removeLikeQuestionDAO(likeReference)
        .then(resolve)
        .catch((reason: FirebaseError) => {
          reject(reason)
        })
    } catch (error) {
      reject({ message: error as string });
    }
  })
}

export const deleteQuestion = (likeReference: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      removeQuestion(likeReference)
        .then(resolve)
        .catch((reason: FirebaseError) => {
          reject(reason)
        })
    } catch (error) {
      reject({ message: error as string });
    }
  })
}

export const checkQuestionAsAnswered = (questionReference: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      checkQuestionAsAnsweredDAO(questionReference)
        .then(resolve)
        .catch((reason: FirebaseError) => {
          reject(reason)
        })
    } catch (error) {
      reject({ message: error as string });
    }
  })
}

export const highLightAnswered = (questionReference: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      highLightAnsweredDAO(questionReference)
        .then(resolve)
        .catch((reason: FirebaseError) => {
          reject(reason)
        })
    } catch (error) {
      reject({ message: error as string });
    }
  })
}

