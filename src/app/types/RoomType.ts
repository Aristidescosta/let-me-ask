import { IQuestionType } from "./QuestionType"

export interface IRoomType{
  authorId: string
  questions: IQuestionType[]
  title: string
}