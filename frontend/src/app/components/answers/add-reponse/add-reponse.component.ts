import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Answer } from 'src/app/models/answer.model'
import { User } from 'src/app/models/user.model'
import { AnswerService } from 'src/app/services/answer.service'

@Component({
  selector: 'app-add-reponse',
  templateUrl: './add-reponse.component.html',
  styleUrls: ['./add-reponse.component.scss'],
})
export class AddReponseComponent {
  @Output() newAnswer = new EventEmitter<Answer>()
  @Input() questionId: string = ''
  form: FormGroup
  user!: User

  constructor(private fb: FormBuilder, private answerService: AnswerService) {
    this.user = JSON.parse(sessionStorage.getItem('user') || '{}')

    this.form = this.fb.group({
      content: ['', Validators.required],
      question: [this.questionId, Validators.required],
      user: [this.user._id, Validators.required],
    })
  }

  ngOnChanges(changes: any) {
    if (this.questionId) {
      this.form.get('question')?.setValue(this.questionId)
    }
  }

  onSubmit() {
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
      this.answerService
        .addAnswer(newForm)

        .subscribe({
          next: (result) => {
            console.log(result)
            this.newAnswer.emit(result)
            this.form.get('content')?.setValue('')
          },
          error: (error: any) => {
            console.error(error)
          },
        })
    }
  }
}
