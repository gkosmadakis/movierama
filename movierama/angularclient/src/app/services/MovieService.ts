import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Movie } from '../models/movie.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://localhost:8080/movierama';
  filteredMovieSubject: Subject<Movie[]> = new Subject<Movie[]>();
  sortByLikeMovieSubject: Subject<Movie[]> = new Subject<Movie[]>();
  sortByHateMovieSubject: Subject<Movie[]> = new Subject<Movie[]>();
  sortByDateMovieSubject: Subject<Movie[]> = new Subject<Movie[]>();
  
  constructor(private http: HttpClient) {}

   getMovies(): Observable<any> {
     console.log('getMovies');
    return this.http.get<Movie[]>(this.apiUrl+'/api/movies')
      .pipe(
        tap(results => {
          return results;
      }),
      );
   }

   getFilteredMovies(userId: number): Observable<any> {
    console.log('getFilteredMovies');
   return this.http.get<Movie[]>(this.apiUrl+'/api/movies/filter/'+userId)
     .pipe(
       tap(results => {
         this.filteredMovieSubject.next(results);
     })
     );
  }

  getSortedMoviesByLikes(): Observable<any> {
    console.log('getSortedMoviesByLikes');
   return this.http.get<Movie[]>(this.apiUrl+'/api/movies/sort/likes')
     .pipe(
       tap(results => {
         this.sortByLikeMovieSubject.next(results);
     })
     );
  }

  
  getSortedMoviesByHates(): Observable<any> {
    console.log('getSortedMoviesByHates');
   return this.http.get<Movie[]>(this.apiUrl+'/api/movies/sort/hates')
     .pipe(
       tap(results => {
         this.sortByHateMovieSubject.next(results);
     })
     );
  }

  getSortedMoviesByDate(): Observable<any> {
    console.log('getSortedMoviesByDate');
   return this.http.get<Movie[]>(this.apiUrl+'/api/movies/sort/date')
     .pipe(
       tap(results => {
         this.sortByDateMovieSubject.next(results);
     })
     );
  }

  addMovie(movie: Partial<Movie>): Observable<Movie> {
    const finalUrl = this.apiUrl+'/api/movies';
    const postHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post<Movie>(finalUrl, movie, { headers: postHeaders});
  }
  
}
