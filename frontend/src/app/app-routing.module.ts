import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthentificationComponent } from './components/authentification/authentification.component'
import { AuthGuard } from './guards/auth.guard'
import { AddQuestionComponent } from './components/questions/add-question/add-question.component'
import { QuestionDetailComponent } from './components/questions/question-detail/question-detail.component'
import { QuestionListComponent } from './components/questions/question-list/question-list.component'

const routes: Routes = [
  { path: '', redirectTo: '/questions', pathMatch: 'full' },
  {
    path: 'questions',
    component: QuestionListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'questions/add',
    component: AddQuestionComponent,
    canActivate: [AuthGuard],
  },
  { path: 'questions/:id', component: QuestionDetailComponent },

  { path: 'connection', component: AuthentificationComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
