import { IUserType } from "./UserType"

export interface IQuestionType {
  author: Omit<IUserType, "uid">
  content: string
  isAnswered: boolean
  isHighLigted: boolean
}