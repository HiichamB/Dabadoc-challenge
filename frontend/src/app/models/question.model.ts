import { Answer } from './answer.model'

export interface Question {
  _id: string
  title: string
  content: string
  location: string
  user: string
  likes: string[]
  answers: Answer[]
}
