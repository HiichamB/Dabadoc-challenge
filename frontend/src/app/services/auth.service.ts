import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false

  constructor() {}

  Authenticated(): boolean {
    return this.isAuthenticated
  }
}