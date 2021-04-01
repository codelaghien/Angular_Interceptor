import { Component } from '@angular/core';
import { DataService } from './data.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AngularInterceptor';
  users = [];

  constructor() {}

  ngOnInit(): void {
    console.log('AppComponent: ngOnInit');
    // this.dataService.login('Huy', '123').subscribe((token) => {
    //   console.log('AppComponent: login', token);
    //   localStorage.setItem('token', token);

    //   this.dataService.getUsers().subscribe((data) => {
    //     console.log('AppComponent: getUsers', data);
    //   });
    // });

    // this.dataService.getUsers().subscribe((data) => {
    //   console.log('AppComponent: getUsers', data);
    //   if (Array.isArray(data)) {
    //     this.users = data;
    //   }
    // });

    // setTimeout(() => {
    //   // this.dataService.getUsers().subscribe((data) => {
    //   //   console.log('AppComponent: getUsers', data);
    //   // });
    //   this.openDialog();
    // }, 2000);
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogLoginComponent, {
  //     width: '250px',
  //     data: { username: '', password: '' },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('The dialog was closed', result);
  //   });
  // }
}
