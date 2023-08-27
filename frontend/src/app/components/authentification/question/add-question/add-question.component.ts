import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent {
  form!: FormGroup

  postQuestion() {}
}
