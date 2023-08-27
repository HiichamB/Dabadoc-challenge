import { Component } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss'],
})
export class AuthentificationComponent {
  form!: FormGroup

  constructor(private fb: FormBuilder, private userService: UserService) {}

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

      this.userService
        .signin(newForm)

        .subscribe({
          next: (result) => {
            console.log(result)
          },
          error: (error: any) => {
            // this.messagesService.showMessage('addError');
          },
        })
    }
  }
}
