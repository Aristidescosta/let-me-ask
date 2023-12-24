import { likeQuestionDAO, removeLikeQuestionDAO } from "../databases/QuestionDAO"

export const likeQuestion = (questionReference: string, authorId: string) => {
  return new Promise((resolve, reject) => {
    likeQuestionDAO(questionReference, authorId)
      .then((response) => {
        if (response) {
          resolve
        }
        else reject({ message: "Erro ao concluir essa acção!" })
      })
      .catch((error) => reject(error.message))
  })
}

export const removeLikeQuestion = (likeReference: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      removeLikeQuestionDAO(likeReference)
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