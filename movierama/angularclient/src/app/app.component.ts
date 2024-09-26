import { Component } from '@angular/core';
import { LoginService } from './services/LoginService';
import { AddMovieDialogComponent } from './add-movie-dialog/add-movie-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddLoginDialogComponent } from './add-login-dialog/add-login-dialog.component';
import { AddSignUpDialogComponent } from './add-sign-up-dialog/add-sign-up-dialog.component';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MovieRama';
  isUserLoggedIn: boolean = false;
  username: string = '';
  currentUser: User[] = [];

  constructor(private loginService: LoginService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loginService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
    this.isUserLoggedIn = isLoggedIn; // Update the value when it changes
    });
    this.loginService.username.subscribe((username: string) => {
      this.username = username; // Update the value when it changes
      });
      // const userJson = localStorage.getItem('currentUser');
      // this.currentUser = userJson !== null ? JSON.parse(userJson) : null;
      // console.log('User logged in ', this.currentUser);
      // if(this.currentUser != null){
      //   this.isUserLoggedIn = true;
      //   //this.username = this.currentUser.username;
      //   }
      //   else {
      //   this.isUserLoggedIn = false;
      //   }
  }
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(AddLoginDialogComponent, {
      width: '400px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Perform actions after the modal is closed
    });
  }

  openSignUpDialog(): void {
    const dialogRef = this.dialog.open(AddSignUpDialogComponent, {
      width: '400px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Perform actions after the modal is closed
    });
  }
}
