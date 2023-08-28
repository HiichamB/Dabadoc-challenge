import { Component } from '@angular/core'
import { Question } from 'src/app/models/question.model'
import { QuestionService } from 'src/app/services/question.service'

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent {
  constructor(private questionService: QuestionService) {
    this.getQuestions()
  }
  questions: any[] = []

  getQuestions() {
    this.questionService.getAllQuestions().subscribe({
      next: (value) => {
        // Use an arrow function to retain the correct 'this' context
        this.questions = value
        console.log('questions', this.questions)
      },
      error: (error) => {
        console.error('Error fetching questions:', error)
      },
    })
  }
}
