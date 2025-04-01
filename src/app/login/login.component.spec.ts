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
  validateInput() {
    throw new Error('Method not implemented.');
  }
  username: string = '';
  password: any;
  email: any;
  showError: any;

  constructor(private router: Router) {}

  login() {
    if (this.username.trim()) {
      localStorage.setItem('username', this.username);
      this.router.navigate(['/home']);
    } else {
      alert('Please enter a valid username');
    }
  }
}
