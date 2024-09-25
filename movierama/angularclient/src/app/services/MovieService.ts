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
  movieSubject: Subject<Movie[]> = new Subject<Movie[]>();
  
  constructor(private http: HttpClient) {}

   getMovies(): Observable<any> {
     console.log('getMovies');
    return this.http.get<Movie[]>(this.apiUrl+'/api/movies')
      .pipe(
        tap(results => {
          this.movieSubject.next(results);
      })
      );
   }

  addMovie(movie: Partial<Movie>): Observable<Movie> {
    const finalUrl = this.apiUrl+'/api/movies';
    const postHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post<Movie>(finalUrl, movie, { headers: postHeaders});
  }

}
