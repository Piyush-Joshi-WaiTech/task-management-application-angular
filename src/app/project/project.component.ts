// // import { Component } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';
// // import { NavbarComponent } from '../navbar/navbar.component';
// // import { ProjectService } from '../services/project.service';

// // @Component({
// //   selector: 'app-project',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule, NavbarComponent],
// //   templateUrl: './project.component.html',
// //   styleUrls: ['./project.component.css'],
// // })
// // export class ProjectComponent {
// //   projects: any[] = [];
// //   project = {
// //     title: '',
// //     description: '',
// //     createdBy: '',
// //     manager: '',
// //     startDate: '',
// //     endDate: '',
// //     dueDate: '',
// //     teamMember: 0,
// //     tasks: [],
// //   }; // ✅ Added 'project' property back

// //   notification: string | null = null;

// //   constructor(private projectService: ProjectService) {
// //     this.projects = this.projectService.getProjects();
// //   }

// //   createProject() {
// //     if (
// //       !this.project.title.trim() ||
// //       !this.project.description.trim() ||
// //       !this.project.createdBy.trim()
// //     ) {
// //       this.showNotification('⚠️ Please fill in all required fields.', 'error');
// //       return;
// //     }

// //     this.projects.push({ ...this.project, tasks: [] });

// //     this.showNotification('✅ Project created successfully!', 'success');

// //     this.project = {
// //       title: '',
// //       description: '',
// //       createdBy: '',
// //       manager: '',
// //       startDate: '',
// //       endDate: '',
// //       dueDate: '',
// //       teamMember: 0,
// //       tasks: [],
// //     };
// //   }

// //   showNotification(message: string, type: 'success' | 'error') {
// //     this.notification = message;
// //     setTimeout(() => {
// //       this.notification = null;
// //     }, 3000);
// //   }
// // }
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { NavbarComponent } from '../navbar/navbar.component';
// import { ProjectService } from '../services/project.service';

// @Component({
//   selector: 'app-project',
//   standalone: true,
//   imports: [CommonModule, FormsModule, NavbarComponent],
//   templateUrl: './project.component.html',
//   styleUrls: ['./project.component.css'],
// })
// export class ProjectComponent implements OnInit {
//   projects: any[] = [];

//   project = {
//     title: '',
//     description: '',
//     createdBy: '',
//     manager: '',
//     startDate: '',
//     endDate: '',
//     dueDate: '',
//     teamMember: 0,
//     tasks: [],
//   };

//   notification: string | null = null;
//   notificationType: 'success' | 'error' | null = null;

//   constructor(private projectService: ProjectService) {}

//   ngOnInit() {
//     this.projectService.reloadProjects(); // ✅ Refresh from localStorage
//     this.projects = this.projectService.getProjects(); // ✅ Load projects
//   }

//   createProject() {
//     if (
//       !this.project.title.trim() ||
//       !this.project.description.trim() ||
//       !this.project.createdBy.trim()
//     ) {
//       this.showNotification('⚠️ Please fill in all required fields.', 'error');
//       return;
//     }

//     this.projectService.addProject({ ...this.project, tasks: [] }); // ✅ Save project

//     this.projects = this.projectService.getProjects();

//     this.showNotification('✅ Project created successfully!', 'success');

//     // ✅ Reset form
//     this.project = {
//       title: '',
//       description: '',
//       createdBy: '',
//       manager: '',
//       startDate: '',
//       endDate: '',
//       dueDate: '',
//       teamMember: 0,
//       tasks: [],
//     };
//   }

//   showNotification(message: string, type: 'success' | 'error') {
//     this.notification = message;
//     this.notificationType = type; // ✅ No more errors

//     setTimeout(() => {
//       this.notification = null;
//       this.notificationType = null;
//     }, 3000);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // ✅ Import Router
import { NavbarComponent } from '../navbar/navbar.component';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projects: any[] = [];

  project = {
    title: '',
    description: '',
    createdBy: '',
    manager: '',
    startDate: '',
    endDate: '',
    dueDate: '',
    teamMember: 0,
    tasks: [],
  };

  notification: string | null = null;
  notificationType: 'success' | 'error' | null = null;

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit() {
    this.loadUserProjects();
  }

  createProject() {
    if (
      !this.project.title.trim() ||
      !this.project.description.trim() ||
      !this.project.createdBy.trim()
    ) {
      this.showNotification('⚠️ Please fill in all required fields.', 'error');
      return;
    }

    this.projectService.addProject({ ...this.project, tasks: [] });

    this.loadUserProjects(); // ✅ Reload projects for the logged-in user

    this.showNotification('✅ Project created successfully!', 'success');

    this.project = {
      title: '',
      description: '',
      createdBy: '',
      manager: '',
      startDate: '',
      endDate: '',
      dueDate: '',
      teamMember: 0,
      tasks: [],
    };
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notification = message;
    this.notificationType = type;

    setTimeout(() => {
      this.notification = null;
      this.notificationType = null;
    }, 3000);
  }

  private loadUserProjects() {
    this.projects = this.projectService.getProjects();

    // ✅ Fetch the task count for each project
    this.projects.forEach((project) => {
      const storedTasks = localStorage.getItem(`tasks_${project.title}`);
      project.taskCount = storedTasks ? JSON.parse(storedTasks).length : 0;
    });
  }

  goToTasks(project: any) {
    this.router.navigate(['/tasks', encodeURIComponent(project.title)]);
  }
}
