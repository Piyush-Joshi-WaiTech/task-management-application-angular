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
    this.username = localStorage.getItem('loggedIn');
    if (!this.username) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
