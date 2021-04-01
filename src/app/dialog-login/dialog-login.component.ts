import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthService } from '../auth.service';
// import { DataService } from '../data.service';

export interface DialogData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss'],
})
export class DialogLoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    // private dataService: DataService,
    public dialogRef: MatDialogRef<DialogLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  submitLogin(): void {
    console.log('DialogLoginComponent', this.data.username, this.data.password);
    this.authService
      .authLogin(this.data.username, this.data.password)
      .subscribe((result) => {
        console.log('login result', result);
        if (Object.prototype.hasOwnProperty.call(result, 'error')) {
          localStorage.setItem('token', null);
          this.data.username = '';
          this.data.password = '';
        } else {
          this.dialogRef.close({ data: this.data });
        }
      });
  }
}
