import { Component } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss'],
})
export class AuthentificationComponent {
  form!: FormGroup
  isLogin: boolean = true
  showError: string = ''
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  sendData() {
    console.log('form value', this.form.getRawValue())
    if (this.form.invalid) {
      this.form.markAllAsTouched()

      let invalidControls = []
      for (let key of Object.keys(this.form.controls)) {
        if (this.form.controls[key].status == 'INVALID')
          invalidControls.push(key)
      }

      console.log('invalid controls -->', invalidControls)

      console.error(this.form)
    } else {
      let newForm = this.form.getRawValue()

      if (this.isLogin) {
        this.userService
          .signin(newForm)

          .subscribe({
            next: (result) => {
              sessionStorage.setItem('token', result.token)
              sessionStorage.setItem('user', JSON.stringify(result.user))
              sessionStorage.setItem('expiresIn', result.expiresIn)

              this.router.navigate(['questions'])
            },
            error: (error: any) => {
              if (error.message) this.showError = error.error.message
              console.error(error)
            },
          })
      } else {
        this.userService
          .signup(newForm)

          .subscribe({
            next: (result) => {
              this.form.reset()
            },
            error: (error: any) => {
              if (error.message) this.showError = error.error.message

              console.error(error)
            },
          })
      }
    }
  }
  changeAction(action: string) {
    this.showError = ''

    action === 'login' ? (this.isLogin = true) : (this.isLogin = false)
  }
}
