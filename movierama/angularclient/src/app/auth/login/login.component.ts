import { Component } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { Router } from '@angular/router';
import notify  from 'devextreme/ui/notify';
import { LoginService } from '../../services/LoginService';
import { User } from '../../models/user.model';
import { JwtResponse } from '../../models/jwtResponse';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isUserLoggedIn: boolean = false;

  constructor(private loginService: LoginService,private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response: JwtResponse) => {
        console.log('Login successful, token received:', response.token);
        this.authService.setToken(response.token);  // Store the JWT token
        this.authService.setCurrentUser(response.user)
        this.router.navigate(['/']);
        notify('Login successful', 'success', 2000);
        this.loginService.setLoggedIn(true);
        this.loginService.setUsername(this.username);
      },
      error => {
        console.error('Login failed', error);
        notify('Login failed', 'error', 2000);
      }
    );
  }
  
}
