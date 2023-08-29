import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Answer } from 'src/app/models/answer.model'
import { Question } from 'src/app/models/question.model'
import { User } from 'src/app/models/user.model'
import { QuestionService } from 'src/app/services/question.service'

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss'],
})
export class QuestionDetailComponent {
  question!: Question
  isLiked: boolean = false
  user!: User

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
  ) {
    this.user = JSON.parse(sessionStorage.getItem('user') || '{}')

    this.activatedRoute.params.subscribe((params) => {
      console.log(params['id'])

      this.questionService.getQuestionById(params['id']).subscribe({
        next: (value) => {
          // Use an arrow function to retain the correct 'this' context
          this.question = value

          this.isLiked = this.question.likes.some(
            (item) => item == this.user._id,
          )
        },
        error: (error) => {
          console.error('Error fetching questions:', error)
        },
      })
    })
  }

  likeUnlike() {
    this.isLiked = !this.isLiked

    this.questionService
      .likeUnlikeQuestion({
        questionId: this.question._id,
        userId: this.user._id,
        isLiked: this.isLiked,
      })
      .subscribe({
        next: (result) => {
          console.log(result)
        },
        error: (error: any) => {
          console.error(error)
          this.isLiked = !this.isLiked
        },
      })
  }
  addResponse(answer: Answer) {
    this.question.answers.push(answer)
  }
}
