import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Question } from '../models/question.model'
import { AuthService } from './auth.service'
import { APIService } from './api.service'

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiUrl = '/questions'

  constructor(private apiService: APIService) {}

  addQuestion(question: Question): Observable<Question> {
    return this.apiService.post<Question>(`${this.apiUrl}`, question)
  }

  getAllQuestions(): Observable<Question[]> {
    return this.apiService.get<Question[]>(`${this.apiUrl}`)
  }

  getQuestionById(id: string): Observable<Question> {
    return this.apiService.get<Question>(`${this.apiUrl}/${id}`)
  }

  updateQuestion(id: string, updatedQuestion: Question): Observable<Question> {
    return this.apiService.patch<Question>(
      `${this.apiUrl}/${id}`,
      updatedQuestion,
    )
  }
}
