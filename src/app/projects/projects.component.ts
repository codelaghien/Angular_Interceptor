import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  users = [];

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.dataService.getUsers('/projects').subscribe((data) => {
      console.log('ProjectsComponent: getUsers', data);
      this.authService.setToken(data?.token?.token);
      if (Array.isArray(data.data)) {
        this.users = data.data;
      }
    });
  }
}
