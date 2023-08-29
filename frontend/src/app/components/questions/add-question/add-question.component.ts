import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { User } from 'src/app/models/user.model'
import { QuestionService } from 'src/app/services/question.service'

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent {
  form!: FormGroup
  location: any = null
  user!: User
  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user') || '{}')

    this.form = this.fb.group({
      title: [null, [Validators.required]],
      content: [null, [Validators.required]],
      location: [null, [Validators.required]],
      user: [this.user._id, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getUserLocation()
  }

  getUserLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.location = `${position.coords.latitude}, ${position.coords.longitude}`
          console.log('location.', this.location)
          this.form.get('location')?.setValue(this.location)
        },
        (error) => {
          console.error('Error getting user location:', error)
        },
      )
    } else {
      console.log('Geolocation is not available in this browser.')
    }
  }
  postQuestion() {
    console.log('form value', this.form.getRawValue())
    if (this.form.invalid) {
      this.form.markAllAsTouched()

      let invalidControls = []
      for (let key of Object.keys(this.form.controls)) {
        if (this.form.controls[key].status == 'INVALID')
          invalidControls.push(key)
      }

      console.log('invalid controls -->', invalidControls)

      if (!this.location) {
        this.getUserLocation()
      }
      console.error(this.form)
    } else {
      let newForm = this.form.getRawValue()
      this.questionService
        .addQuestion(newForm)

        .subscribe({
          next: (result) => {
            console.log(result)
            this.form.get('title')?.setValue('')
            this.form.get('content')?.setValue('')
          },
          error: (error: any) => {
            console.error(error)
          },
        })
    }
  }
}
