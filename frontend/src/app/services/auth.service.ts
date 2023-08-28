import { HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false

  constructor() {
    console.log('constructor')
  }

  Authenticated(): boolean {
    console.log(this.isAuthenticated)

    return this.isAuthenticated
  }

  isLoggedIn(): boolean | void {
    if (sessionStorage.getItem('token')) {
      if (!sessionStorage.getItem('expiresIn')) return false

      if (
        // @ts-ignore
        JSON.parse(sessionStorage.getItem('expiresIn')) - Date.now()
      )
        return true

      if (
        // @ts-ignore
        JSON.parse(sessionStorage.getItem('expiresIn')) < Date.now()
      ) {
        sessionStorage.clear()

        return true
      }

      return true
    }

    return false
  }

  login() {
    this.isAuthenticated = true
  }

  logOut() {
    this.isAuthenticated = false
  }

  getHeaders(headers: any = {}) {
    if (sessionStorage.getItem('token'))
      headers.token = sessionStorage.getItem('token')

    return new HttpHeaders(headers)
  }
}
