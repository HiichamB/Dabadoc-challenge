import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Question } from '../models/question.model'

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiUrl = 'http://localhost:3000/api/questions'

  constructor(private http: HttpClient) {}

  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}`, question)
  }

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}`)
  }

  getQuestionById(id: string): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/${id}`)
  }

  updateQuestion(id: string, updatedQuestion: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/${id}`, updatedQuestion)
  }
}
