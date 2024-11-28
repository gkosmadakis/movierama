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
  selectedUserId : number = 0;

  constructor(private movieService: MovieService, public dialog: MatDialog,private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
      this.isUserLoggedIn = isLoggedIn; // Check if user is logged in
      });
     // Call getMovies to fetch the movies from the API and push them into the movieSubject
     this.movieService.getMovies().subscribe(data => {
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
    var data = this.users.find(x => x.username === newValue.value);
    if(data != undefined) {
      this.selectedUserId = data.id;
    }
    this.filterMovies();
}

// Method to filter movies based on the selected user
filterMovies() {
  if (this.selectedUser === 'all') {
    this.filteredMovies = this.movies; // Show all movies if 'All Users' is selected
  } else {
    this.movieService.getFilteredMovies(this.selectedUserId).subscribe();
    this.movieServiceSubscription = this.movieService.filteredMovieSubject.subscribe(data => {
      this.filteredMovies = data;
    });
  }
}

sortMovies() {
  switch (this.sortCriterion) {
    case 'date':
      this.movieService.getSortedMoviesByDate().subscribe();
    this.movieServiceSubscription = this.movieService.sortByDateMovieSubject.subscribe(data => {
      this.filteredMovies = data;
      console.log('Dates are ', data);
    });
      break;
    case 'likes':
      this.movieService.getSortedMoviesByLikes().subscribe();
      this.movieServiceSubscription = this.movieService.sortByLikeMovieSubject.subscribe(data => {
        this.filteredMovies = data;
        console.log('Likes are ', data);
      });
      break;
    case 'hates':
      this.movieService.getSortedMoviesByHates().subscribe();
      this.movieServiceSubscription = this.movieService.sortByHateMovieSubject.subscribe(data => {
        this.filteredMovies = data;
        console.log('Hates are ', data);
      });
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
