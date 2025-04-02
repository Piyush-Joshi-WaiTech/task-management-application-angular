import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private storageKey = 'projects'; // Key for localStorage

  private projects: any[] = [];

  constructor() {
    this.loadProjects();
  }

  // ✅ Load projects from localStorage
  private loadProjects() {
    if (typeof localStorage !== 'undefined') {
      const storedProjects = localStorage.getItem(this.storageKey);
      this.projects = storedProjects ? JSON.parse(storedProjects) : [];
    }
  }

  // ✅ Get all projects
  getProjects(): any[] {
    return this.projects;
  }

  // ✅ Add project and save to localStorage
  addProject(project: any) {
    this.projects.push(project);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(this.projects));
    }
  }

  // ✅ Refresh projects from localStorage (for Project Page)
  reloadProjects() {
    this.loadProjects();
  }
}
