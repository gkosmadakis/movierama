import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { tap } from 'rxjs/operators';
import { VoteResponse } from "../models/dto/VoteResponse";
import { Vote } from "../models/vote.model";

@Injectable({
    providedIn: 'root'
  })
  export class VoteService {
    private apiUrl = 'http://localhost:8080/movierama';

    constructor(private http: HttpClient) {}

    voteMovie(vote: Vote): Observable<VoteResponse> {
        const finalUrl = this.apiUrl+'/api/votes';
        const postHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});
        return this.http.post<VoteResponse>(finalUrl, vote, { headers: postHeaders});
      }

      removeVote(id: number): Observable<void> {
        const finalUrl = this.apiUrl+'/api/votes';
        return this.http.delete<void>(finalUrl+'/'+id);
      }

      getLikesByMovieId(id: number): Observable<any> {
        console.log('getLikesByMovieId');
       return this.http.get<Vote[]>(this.apiUrl+'/api/votes/likes/'+id)
         .pipe(
           tap(results => {
            return results;
         })
         );
      }

      getHatesByMovieId(id: number): Observable<any> {
        console.log('getHatesByMovieId');
       return this.http.get<Vote[]>(this.apiUrl+'/api/votes/hates/'+id)
         .pipe(
           tap(results => {
            return results;
         })
         );
      }
  }