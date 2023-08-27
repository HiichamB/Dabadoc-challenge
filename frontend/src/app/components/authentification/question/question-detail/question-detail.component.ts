import { Component } from '@angular/core'
import { Question } from 'src/app/models/question.model'

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss'],
})
export class QuestionDetailComponent {
  question!: Question
}
