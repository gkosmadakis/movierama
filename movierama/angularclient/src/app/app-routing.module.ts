import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './auth/login/login.component';
import { SignupComponent} from './auth/signup/signup.component';
import { MovieFormComponent} from './movie-form/movie-form.component';
import { MovieItemComponent} from './movie-item/movie-item.component';
import { MovieListComponent} from './movie-list/movie-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'movie-form', component: MovieFormComponent },
  { path: 'movie-item', component: MovieItemComponent },
  { path: 'movie-list', component: MovieListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
