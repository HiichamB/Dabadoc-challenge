import { Component, Input } from '@angular/core'
import { Answer } from 'src/app/models/answer.model'

@Component({
  selector: 'app-list-reponse',
  templateUrl: './list-reponse.component.html',
  styleUrls: ['./list-reponse.component.scss'],
})
export class ListReponseComponent {
  @Input() answers: Answer[] = []
}
