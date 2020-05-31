import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Student} from '../models/student';
import {FormControl, Validators} from '@angular/forms';

interface Specialty {
  name: string;
}

@Component({
  selector: 'app-student-dialog-box',
  templateUrl: './student-dialog-box.component.html',
  styleUrls: ['./student-dialog-box.component.css']
})
export class StudentDialogBoxComponent implements OnInit {
  studEmailFormControl = new FormControl('', [Validators.required, Validators.email,]);
  studLastNameControl = new FormControl('', [Validators.required,]);
  studFirstNameControl = new FormControl('', [Validators.required]);
  studGroupControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  specialties: Specialty[] = [{name: 'Software engineering'},
    {name: 'Computer engineering'}, {name: 'Cybersecurity'},
    {name: 'Data scientist'}, {name: 'Computer science'}
  ];

  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<StudentDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Student) {
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  isValidStudentData() {
    return !this.studFirstNameControl.hasError('required') &&
      !this.studLastNameControl.hasError('required') &&
      this.studGroupControl.errors == null &&
      !(this.studEmailFormControl.hasError('required') ||
        this.studEmailFormControl.hasError('email'));

  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.local_data});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  ngOnInit(): void {
  }

}
