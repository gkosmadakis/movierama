import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddMovieDialogComponent } from '../add-movie-dialog/add-movie-dialog.component';
import { AuthService } from '../services/AuthService';
import { JwtResponse } from '../models/jwtResponse';
import { LoginService } from '../services/LoginService';

@Component({
  selector: 'app-add-login-dialog',
  templateUrl: './add-login-dialog.component.html',
  styleUrl: './add-login-dialog.component.css'
})
export class AddLoginDialogComponent {
  username: string = '';
  password: string = '';
  
  constructor(public dialogRef: MatDialogRef<AddMovieDialogComponent>, private authService: AuthService,private loginService: LoginService) {}

  onSubmit(): void {
    // Handle form submission here
    console.log('Username: ', this.username);
    console.log('Email: ', this.password);
    this.authService.login(this.username, this.password).subscribe(
      (response: JwtResponse) => {
        console.log('Login successful, token received:', response.token);
        alert('Login success');
        this.authService.setToken(response.token);  // Store the JWT token
        this.authService.setCurrentUser(response.user)
        //this.router.navigate(['/']);
        //notify('Login successful', 'success', 2000);
        this.loginService.setLoggedIn(true);
        this.loginService.setUsername(this.username);
      },
      error => {
        alert('Login failed');
        console.error('Login failed', error);
        
      }
    );
    this.dialogRef.close(); // Close the modal
  }

  onCancel(): void {
    
    this.dialogRef.close(); // Close the modal without doing anything
  }
}
