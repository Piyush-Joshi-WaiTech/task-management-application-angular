import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  username: string | null = '';

  constructor(private router: Router) {
    // Get the email stored in localStorage (the username)
    this.username = localStorage.getItem('email'); // Get the correct value from localStorage
    if (!this.username) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('email'); // Remove email (username) on logout
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }
}
