import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

export interface UsersData {
  mark: number;
  id: number;
}

@Component({
  selector: 'app-subject-dialog-box',
  templateUrl: './subject-dialog-box.component.html',
  styleUrls: ['./subject-dialog-box.component.css']
})
export class SubjectDialogBoxComponent implements OnInit {
  markControl = new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]);
  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<SubjectDialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    this.local_data = {...data};
    this.action = this.local_data.action;
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
