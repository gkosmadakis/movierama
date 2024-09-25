import { Component } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup(): void {
    this.authService.signup(this.username, this.email, this.password).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
