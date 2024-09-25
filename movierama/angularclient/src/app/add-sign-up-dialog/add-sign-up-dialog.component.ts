import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddMovieDialogComponent } from '../add-movie-dialog/add-movie-dialog.component';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-add-sign-up-dialog',
  templateUrl: './add-sign-up-dialog.component.html',
  styleUrl: './add-sign-up-dialog.component.css'
})
export class AddSignUpDialogComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  
  constructor(public dialogRef: MatDialogRef<AddMovieDialogComponent>, private authService: AuthService) {}

  onSubmit(): void {
    // Handle form submission here
    console.log('Username: ', this.username);
    console.log('Email: ', this.email);
    console.log('Email: ', this.password);
    this.authService.signup(this.username, this.email, this.password).subscribe(() => {
      //this.router.navigate(['/']);
      alert('Sign up success');
    });
    this.dialogRef.close(); // Close the modal
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the modal without doing anything
  }
}
