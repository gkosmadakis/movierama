import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/AuthService';
import { MovieService } from '../services/MovieService';

@Component({
  selector: 'app-add-movie-dialog',
  templateUrl: './add-movie-dialog.component.html',
  styleUrls: ['./add-movie-dialog.component.css']
})
export class AddMovieDialogComponent {
  title: string = '';
  description: string = '';
  movieFormServiceSubscription!: Subscription;
  movieServiceSubscription!: Subscription;

  constructor(public dialogRef: MatDialogRef<AddMovieDialogComponent>, private authService: AuthService,private movieService: MovieService) {}

  onSubmit(): void {
    // Handle form submission here
    console.log('Movie Title: ', this.title);
    console.log('Movie Description: ', this.description);
    console.log('submitMovie');
    const loggedInUser = this.authService.getCurrentUser();
    this.movieFormServiceSubscription = this.movieService.addMovie({
      title: this.title, description: this.description, user: loggedInUser,
      dateAdded: new Date()
    }).subscribe(data => {
      console.log('Added a new movie ',data);
      alert('Movie added successfully');
      this.movieService.getMovies().subscribe();
      this.movieServiceSubscription = this.movieService.movieSubject.subscribe(data => {
      console.log('Loaded all stored movies from movieform ',data);
    });
    });
    this.dialogRef.close(); // Close the modal
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the modal without doing anything
  }
}
