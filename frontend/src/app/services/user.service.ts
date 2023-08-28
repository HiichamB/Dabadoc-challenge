import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api'

  constructor(private http: HttpClient) {}

  signin(user: User) {
    return this.http.post<{ token: string; expiresIn: string; user: User }>(
      `${this.apiUrl}/connect/login`,
      user,
    )
  }

  signup(user: User) {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/connect/register`,
      user,
    )
  }

  // Add more user-related methods as needed
}
