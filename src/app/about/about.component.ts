import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  users = [];

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.dataService.getUsers('/about').subscribe((data) => {
      // console.log('AboutComponent: getUsers', data);
      this.authService.setToken(data?.token);
      if (Array.isArray(data.data)) {
        this.users = data.data;
      }
    });
  }
}
