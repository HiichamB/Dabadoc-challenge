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

      // #endregion invalids controls

      console.error(this.form)
    } else {
      let newForm = this.form.getRawValue()

      console.log('form newForm. ', newForm)
      if (this.isLogin) {
        this.userService
          .signin(newForm)

          .subscribe({
            next: (result) => {
              sessionStorage.setItem('token', result.token)
              sessionStorage.setItem('user', JSON.stringify(result.user))
              sessionStorage.setItem('expiresIn', result.expiresIn)

              console.log(result)
              // this.authService.isLoggedIn()
              console.log('before')

              this.router.navigate(['questions'])

              console.log('after')
            },
            error: (error: any) => {
              // this.messagesService.showMessage('addError');
            },
          })
      } else {
        this.userService
          .signup(newForm)

          .subscribe({
            next: (result) => {
              console.log(result)
              this.form.reset()
            },
            error: (error: any) => {
              // this.messagesService.showMessage('addError');
            },
          })
      }
    }
  }
  changeAction(action: string) {
    action === 'login' ? (this.isLogin = true) : (this.isLogin = false)
  }
}
