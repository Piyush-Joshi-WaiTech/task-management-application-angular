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
    createdBy: '',
    manager: '',
    startDate: '',
    endDate: '',
    teamMember: '',
    dueDate: '',
  };

  tasks: any[] = [];
  task = {
    title: '',
    assignedTo: '',
    status: '',
    estimatedTime: '',
  };

  isTaskCreationVisible: boolean = false;
  showError: boolean = false;
  showTaskError: boolean = false;

  constructor(private router: Router) {
    if (typeof localStorage !== 'undefined') {
      this.username = localStorage.getItem('email');
    }

    if (!this.username) {
      this.router.navigate(['/login']);
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  createProject() {
    this.validateProjectForm();
    if (this.showError) {
      return;
    }

    console.log('Project Created:', this.project);
    this.showError = false;
  }

  validateProjectForm() {
    this.showError =
      !this.project.title ||
      !this.project.description ||
      !this.project.createdBy ||
      !this.project.manager ||
      !this.project.startDate ||
      !this.project.endDate ||
      !this.project.teamMember ||
      !this.project.dueDate;
  }

  toggleTaskCreation() {
    this.isTaskCreationVisible = !this.isTaskCreationVisible;
  }

  createTask() {
    this.validateTaskForm();

    if (this.showTaskError) {
      return;
    }

    this.tasks.push({ ...this.task });
    console.log('Task Created:', this.task);
    alert('Task Created Successfully!');

    // Reset form
    this.task = { title: '', assignedTo: '', status: '', estimatedTime: '' };
    this.showTaskError = false;
  }

  validateTaskForm() {
    this.showTaskError = true; // **Ensure validation errors are shown**

    if (
      this.task.title &&
      this.task.assignedTo &&
      this.task.status &&
      this.task.estimatedTime
    ) {
      this.showTaskError = false;
    }
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
