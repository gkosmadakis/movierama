import { Component, OnInit, OnDestroy  } from '@angular/core';
import { MovieService } from '../services/MovieService';
import { Movie } from '../models/movie.model';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddMovieDialogComponent } from '../add-movie-dialog/add-movie-dialog.component';
import { LoginService } from '../services/LoginService';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit , OnDestroy {
  movies: Movie[] = [];
  sortCriterion: string = 'date';
  movieServiceSubscription!: Subscription;
  users: User[] = [];
  isUserLoggedIn: boolean = false;
  selectedUser: string = 'all'; // Initially, show all movies
  filteredMovies : Movie[] = [];

  constructor(private movieService: MovieService, public dialog: MatDialog,private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
      this.isUserLoggedIn = isLoggedIn; // Check if user is logged in
      });
     // Call getMovies to fetch the movies from the API and push them into the movieSubject
     this.movieService.getMovies().subscribe();
    this.movieServiceSubscription = this.movieService.movieSubject.subscribe(data => {
      this.movies = data;
      console.log('Loaded all stored movies ',this.movies);
      this.filteredMovies = this.movies;
      this.users = [];
      this.movies.forEach(item => {
        this.users.push(item.user);
      })
    });
    this.filterMovies();
  }

  onSortCriterionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.sortCriterion = selectElement.value;
    this.sortMovies();
  }

// Method triggered when a user is selected
  onUserSelect(newValue: any) {
    console.log(newValue);
    this.selectedUser = newValue.value;
    this.filterMovies();
}

// Method to filter movies based on the selected user
filterMovies() {
  if (this.selectedUser === 'all') {
    this.filteredMovies = this.movies; // Show all movies if 'All Users' is selected
  } else {
    this.filteredMovies = this.movies.filter(movie => movie.user.username === this.selectedUser);
  }
}

sortMovies() {
  switch (this.sortCriterion) {
    case 'date':
      this.filteredMovies.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
      break;
    case 'likes':
      this.filteredMovies.sort((a, b) => b.likesCount - a.likesCount);
      break;
    case 'hates':
      this.filteredMovies.sort((a, b) => b.hatesCount - a.hatesCount);
      break;
  }
}

openAddMovieDialog(): void {
  const dialogRef = this.dialog.open(AddMovieDialogComponent, {
    width: '400px',
    data: {}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}

ngOnDestroy(): void {
  if (this.movieServiceSubscription) {
    this.movieServiceSubscription.unsubscribe();  // Unsubscribe when the component is destroyed
  }
}

}
