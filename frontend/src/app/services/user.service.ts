import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'

  constructor(private http: HttpClient) {}

  signup(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, user)
  }

  signin(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, user)
  }

  // Add more user-related methods as needed
}
