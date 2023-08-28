import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Answer } from '../models/answer.model'
import { APIService } from './api.service'

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private apiUrl = 'http://localhost:3000/api/answers'

  constructor(private apiService: APIService) {}

  addAnswer(answer: Answer): Observable<Answer> {
    return this.apiService.post<Answer>(`${this.apiUrl}`, answer)
  }
}
