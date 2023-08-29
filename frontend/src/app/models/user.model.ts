import { Answer } from './answer.model'
import { Question } from './question.model'

export interface User {
  _id: string
  email: string
  password: string
  favorites: Question[]
  answers: Answer[]
  questions: Question[]
}
