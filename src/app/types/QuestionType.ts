import { IUserType } from "./UserType"

export interface IQuestionType {
  author: Omit<IUserType, "id">
  content: string
  isAnswered: boolean
  isHighLigted: boolean
  likeCount: number
  likeId: string | undefined
}