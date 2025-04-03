import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  projectTitle: string = '';
  tasks: any[] = [];
  showTaskForm: boolean = false;

  task = {
    title: '',
    assignedTo: '',
    status: '',
    estimate: 0,
    timeSpent: 0,
  };

  notification: string | null = null;
  notificationType: 'success' | 'error' | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.projectTitle = decodeURIComponent(
      this.route.snapshot.paramMap.get('projectTitle') || ''
    );
    this.loadTasks();
  }

  loadTasks() {
    const storedTasks = localStorage.getItem(`tasks_${this.projectTitle}`);
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  }

  createTask() {
    if (!this.task.title.trim() || !this.task.assignedTo.trim()) {
      this.showNotification('⚠️ Please fill in all required fields.', 'error');
      return;
    }

    this.tasks.push({ ...this.task });

    localStorage.setItem(
      `tasks_${this.projectTitle}`,
      JSON.stringify(this.tasks)
    );

    this.showNotification('✅ Task created successfully!', 'success');

    this.task = {
      title: '',
      assignedTo: '',
      status: '',
      estimate: 0,
      timeSpent: 0,
    };
    this.showTaskForm = false;
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notification = message;
    this.notificationType = type;
    setTimeout(() => {
      this.notification = null;
      this.notificationType = null;
    }, 3000);
  }

  getStatusClass(status: string) {
    return {
      'text-danger': status === 'High',
      'text-warning': status === 'Medium',
      'text-primary': status === 'Low',
    };
  }
}
