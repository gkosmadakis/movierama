import { Component } from '@angular/core';
import { MovieService } from '../services/MovieService';
import { Movie } from '../models/movie.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent {
  title: string = '';
  description: string = '';
  movieFormServiceSubscription!: Subscription;
  movieServiceSubscription!: Subscription;
  movie: Movie[] = [];


  constructor(private movieService: MovieService, private router: Router, private authService: AuthService) {}

  submitMovie(): void {
    console.log('submitMovie');
    const loggedInUser = this.authService.getCurrentUser();
    this.movieFormServiceSubscription = this.movieService.addMovie({
      title: this.title, description: this.description, user: loggedInUser,
      dateAdded: new Date()
    }).subscribe(data => {
      console.log('Added a new movie ',data);
      this.movieService.getMovies().subscribe();
      this.movieServiceSubscription = this.movieService.movieSubject.subscribe(data => {
      console.log('Loaded all stored movies from movieform ',data);
    });
    });
  }
}
