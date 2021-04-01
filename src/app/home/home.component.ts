import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogLoginComponent } from '.././dialog-login/dialog-login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  users = [];

  constructor() {}

  ngOnInit(): void {
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
}
