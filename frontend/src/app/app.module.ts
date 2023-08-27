import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthentificationComponent } from './components/authentification/authentification.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { QuestionListComponent } from './components/authentification/question/question-list/question-list.component'
import { AddQuestionComponent } from './components/authentification/question/add-question/add-question.component'
import { QuestionDetailComponent } from './components/authentification/question/question-detail/question-detail.component'

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    QuestionListComponent,
    AddQuestionComponent,
    QuestionDetailComponent,
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
