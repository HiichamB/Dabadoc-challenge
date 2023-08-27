import { Component } from '@angular/core'
import { Question } from 'src/app/models/question.model'

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent {
  questions: Question[] = []
}
