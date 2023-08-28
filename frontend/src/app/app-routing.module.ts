import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthentificationComponent } from './components/authentification/authentification.component'
import { QuestionListComponent } from './components/authentification/question/question-list/question-list.component'
import { AuthGuard } from './guards/auth.guard'
import { AddQuestionComponent } from './components/authentification/question/add-question/add-question.component'

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

  {
    path: 'questions/:id',
    component: AddQuestionComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'questions/:id/answer',
  //   component: AnswerComponent,
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'favorites',
  //   component: FavoritesComponent,
  //   canActivate: [AuthGuard],
  // },
  { path: 'connection', component: AuthentificationComponent },

  // Add more routes as needed
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
