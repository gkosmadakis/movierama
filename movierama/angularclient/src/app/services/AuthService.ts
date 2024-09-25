import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { User } from '../models/user.model';
import { JwtResponse } from '../models/jwtResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/movierama/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, { username, password });
  }

  signup(username: string, email: string, password: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/signup`, { username, email, password });
  }

  setToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser') || '{}'); 
  }
  
}
