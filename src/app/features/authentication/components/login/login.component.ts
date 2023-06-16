import { Component } from '@angular/core';
import { ILogin } from '../../models/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public errorMessage: string = '';
  public isLoading: boolean = false;
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private jwtHelper: JwtHelperService) { }

  login(): void {
    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email';
    }
    else if (!this.password) {
      this.errorMessage = 'Please enter password';
    }
    else {
      this.isLoading = true;
      const credentials = {
        email: this.email,
        password: this.password,
      };

      this.authService.login(credentials).subscribe(
        (response) => {
          this.isLoading = false;
          if (response.statusCode === 200) {
            const token = response.value.token;
            localStorage.setItem('access_token', token);
            const decodedToken = this.jwtHelper.decodeToken(token);
            const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            this.authService.profileId = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata']
            if (role === 'User') {
              console.log("Success: 200:OK")
              this.router.navigate(['/build-resume']);
            } else if (role === 'Admin') {
              // Redirect to another page based on the role (if needed)
              // this.router.navigate(['/Admin']);
            }
            else if (role === 'Super') {
              // Redirect to another page based on the role (if needed)
              // this.router.navigate(['/Super']);
            }
          } else {
            console.error('Login failed: Role Error', response);
            this.errorMessage=response.value;
            //Clear the Storage
            localStorage.clear();
          }
        },
        (error) => {
          this.isLoading = false;
          console.error('Login failed: Server error:', error);
          const errorResponse = error.error;
          this.errorMessage = "ddddddddd";
          // Handle login error
          //Clear the Storage
          localStorage.clear();
        }
      );
    }
  }

  //Email Validator
  private isValidEmail(email: string): boolean {
    // Email validation rule using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}