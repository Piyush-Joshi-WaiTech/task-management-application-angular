import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showError: boolean = false;

  signUpEmail: string = '';
  signUpPassword: string = '';
  isSignUp: boolean = false;

  private adminEmail = 'Piyush Joshi';
  private adminPassword = 'admin123';

  constructor(private router: Router) {}

  login() {
    if (this.email.trim() === '' || this.password.trim() === '') {
      this.showError = true;
    } else if (
      this.email === this.adminEmail &&
      this.password === this.adminPassword
    ) {
      localStorage.setItem('email', this.email);
      localStorage.setItem('loggedIn', 'true');
      this.router.navigate(['/home']);
    } else {
      this.showError = true;
    }
  }

  toggleSignUp() {
    this.isSignUp = !this.isSignUp;
    this.showError = false;
  }

  signUp() {
    if (this.signUpEmail.trim() === '' || this.signUpPassword.trim() === '') {
      this.showError = true;
    } else {
      localStorage.setItem('email', this.signUpEmail);
      localStorage.setItem('loggedIn', 'true');
      this.router.navigate(['/home']);
    }
  }

  validateInput() {
    this.showError = this.email.trim() === '' || this.password.trim() === '';
  }
}
