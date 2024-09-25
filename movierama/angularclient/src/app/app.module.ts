import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent} from './auth/login/login.component';
import { SignupComponent} from './auth/signup/signup.component';
import { MovieFormComponent} from './movie-form/movie-form.component';
import { MovieItemComponent} from './movie-item/movie-item.component';
import { MovieListComponent} from './movie-list/movie-list.component';
import { JwtInterceptor } from './services/JwtInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AddMovieDialogComponent } from './add-movie-dialog/add-movie-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AddLoginDialogComponent } from './add-login-dialog/add-login-dialog.component';
import { AddSignUpDialogComponent } from './add-sign-up-dialog/add-sign-up-dialog.component';
//import { AuthService } from './services/AuthService';
//import { MovieService } from './services/MovieService';
//import { VoteService } from './services/VoteService';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MovieFormComponent,
    MovieItemComponent,
    MovieListComponent,
    AddMovieDialogComponent,
    AddLoginDialogComponent,
    AddSignUpDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      provideAnimationsAsync()
    //,AuthService, MovieService, VoteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
