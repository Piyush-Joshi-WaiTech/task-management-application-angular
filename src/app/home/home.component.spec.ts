import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  username: string | null = '';

  constructor(private router: Router) {
    this.username = localStorage.getItem('username');
    if (!this.username) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
