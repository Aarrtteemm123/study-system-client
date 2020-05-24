import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Admin} from '../models/admin';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-dialog-box',
  templateUrl: './admin-dialog-box.component.html',
  styleUrls: ['./admin-dialog-box.component.css']
})
export class AdminDialogBoxComponent implements OnInit {
  adminEmailFormControl = new FormControl('', [Validators.required, Validators.email,]);
  adminLastNameControl = new FormControl('', [Validators.required,]);
  adminFirstNameControl = new FormControl('', [Validators.required]);
  action:string;
  local_data:any;

  constructor(
    public dialogRef: MatDialogRef<AdminDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Admin) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  isValidAdminData()
  {
    return !this.adminFirstNameControl.hasError('required')&&
      !this.adminLastNameControl.hasError('required')&&
      !(this.adminEmailFormControl.hasError('required')||
        this.adminEmailFormControl.hasError('email'))

  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  ngOnInit(): void {
  }

}
