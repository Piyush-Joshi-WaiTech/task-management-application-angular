import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class HomeComponent {
  username: string | null = '';
  isDarkMode: boolean = false;

  project = {
    title: '',
    description: '',
    manager: '',
    startDate: '',
    endDate: '',
    dueDate: '',
  };

  tasks: any[] = [];
  task = {
    title: '',
    assignedTo: '',
    status: 'Pending',
    estimatedTime: 0,
    timeSpent: 0,
  };
  isTaskCreationVisible: boolean = false;

  constructor(private router: Router) {
    this.username = localStorage.getItem('email');
    if (!this.username) {
      this.router.navigate(['/login']);
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  createProject() {
    console.log('Project created:', this.project);
  }

  toggleTaskCreation() {
    this.isTaskCreationVisible = !this.isTaskCreationVisible;
  }

  createTask() {
    this.tasks.push({ ...this.task });
    console.log('Task created:', this.task);
  }

  editTask(task: any) {
    console.log('Edit task:', task);
  }

  deleteTask(task: any) {
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }
}
