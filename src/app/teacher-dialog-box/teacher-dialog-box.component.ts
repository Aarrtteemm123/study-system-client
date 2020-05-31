import {Component, Inject, OnInit, Optional} from '@angular/core';
import {Teacher} from '../models/teacher';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-teacher-dialog-box',
  templateUrl: './teacher-dialog-box.component.html',
  styleUrls: ['./teacher-dialog-box.component.css']
})
export class TeacherDialogBoxComponent implements OnInit {
  teacherEmailFormControl = new FormControl('', [Validators.required, Validators.email,]);
  teacherLastNameControl = new FormControl('', [Validators.required,]);
  teacherFirstNameControl = new FormControl('', [Validators.required]);
  teacherWorkExpControl = new FormControl(0, [Validators.required,Validators.min(0)]);
  action:string;
  local_data:any;
  teacherSkills: string[] = ['Assembler','C/C++', 'Java','Python','JavaScript','C#',
    'Web design', 'Computer graphics', 'Math',
    'Project analysis','Network technology','English', 'ML']; // also subjects

  constructor(
    public dialogRef: MatDialogRef<TeacherDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Teacher) {
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  isValidTeacherData()
  {
    return !this.teacherFirstNameControl.hasError('required')&&
      !this.teacherLastNameControl.hasError('required')&&
      this.teacherWorkExpControl.errors==null&&
      !(this.teacherEmailFormControl.hasError('required')||
        this.teacherEmailFormControl.hasError('email'))

  }

  getSkillsList($event) {
    this.local_data.skillsLst = $event;
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
