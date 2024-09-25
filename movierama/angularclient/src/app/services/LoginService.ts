// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Initial value is false
  isLoggedIn = this.isLoggedInSubject.asObservable(); // Expose as observable
  private usernameSubject = new BehaviorSubject<string>('');
  username = this.usernameSubject.asObservable();

  constructor() {}

  // Call this method to update the login state
  setLoggedIn(value: boolean): void {
    this.isLoggedInSubject.next(value);
  }

  // Call this method to set the username
  setUsername(value: string): void {
    this.usernameSubject.next(value);
  }


}
