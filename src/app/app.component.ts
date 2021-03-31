import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AngularInterceptor';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getUsers().subscribe((data) => {
      console.log('AppComponent: getUsers', data);
    });

    this.dataService.getUsers2().subscribe((data) => {
      console.log('AppComponent: getUsers2', data);
    });
  }
}
