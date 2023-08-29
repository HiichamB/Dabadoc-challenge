import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthentificationComponent } from './components/authentification/authentification.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { ListReponseComponent } from './components/answers/list-reponse/list-reponse.component'
import { AddReponseComponent } from './components/answers/add-reponse/add-reponse.component'
import { AddQuestionComponent } from './components/questions/add-question/add-question.component'
import { QuestionDetailComponent } from './components/questions/question-detail/question-detail.component'
import { QuestionListComponent } from './components/questions/question-list/question-list.component'

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    QuestionListComponent,
    AddQuestionComponent,
    QuestionDetailComponent,

    ListReponseComponent,
    AddReponseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
