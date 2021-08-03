import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';

const routes: Routes = [
  { path: 'signup', component: SignupComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent, pathMatch:"full" },
  //admin + child route
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard],
    children: [
      { path: '', component: WelcomeComponent, pathMatch:'full'},
      { path: 'profile', component: ProfileComponent, pathMatch:'full'},
      { path: 'categories', component: ViewCategoriesComponent, pathMatch:'full'},
      { path: 'add-category', component: AddCategoryComponent, pathMatch:'full'},
      { path: 'quizzes', component: ViewQuizzesComponent, pathMatch:'full'},
      { path: 'add-quiz', component: AddQuizComponent, pathMatch:'full'},
      { path: 'update-quiz/:qid', component: UpdateQuizComponent, pathMatch:'full'},
      { path: 'view-questions/:id/:title', component: ViewQuizQuestionsComponent, pathMatch:'full'},
      { path: 'add-question/:qid/:title', component: AddQuestionComponent, pathMatch:'full'}
    ]
  },

  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [UserGuard],
    children: [
      { path: ':catId', component: LoadQuizComponent, pathMatch: 'full'},
      { path: 'instructions/:qid', component: InstructionsComponent, pathMatch: 'full'},
    ]
  },
  { path: '', component: HomeComponent, pathMatch:"full" },
  { path: 'start-quiz/:qid', component: StartQuizComponent, canActivate: [UserGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
