import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Student} from '../models/student';
import {User} from '../models/user';
import {SubjectDialogBoxComponent} from '../subject-dialog-box/subject-dialog-box.component';
import {MatTable} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {TeacherService} from './teacher.service';
import {Teacher} from '../models/teacher';

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.css']
})
export class TeacherPageComponent implements OnInit {
  student = new Student(new User('', '', '', '', '', 'student'), 0, '', []);
  teacher = new Teacher(new User('', '', '', '', '', 'teacher'), 0, [], []);
  searchStr = '';
  displayedColumns: string[] = ['id', 'subject', 'mark', 'action'];
  dataSource = this.student.subjectLst;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private router: Router, private teacherService: TeacherService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.teacherService.getTeacher().subscribe(data => {
      if (data != null) {
        this.teacher = data;
      } else {
        this.router.navigate(['title']);
      }
    });
  }

  update() {
    this.dataSource = this.student.subjectLst;
  }

  openDialog(action, obj) {
    let teacherSkill = this.teacher.skillsLst.find(skill => skill === obj.name);
    let teacherGroup = this.teacher.groups.find(group => group === this.student.group);
    if (typeof teacherSkill != 'undefined' && typeof teacherGroup != 'undefined') {
      obj.action = action;
      const dialogRef = this.dialog.open(SubjectDialogBoxComponent, {
        width: '250px',
        data: obj
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.event == 'Update') {
          this.updateRowData(result.data);
          this.teacherService.updateMarks(this.student).subscribe(data => {
          });
        }
      });
    } else {
      alert('You don\'t have access to this subject or(and) group');
    }
  }

  updateRowData(row_obj) {
    this.dataSource = this.dataSource.filter((value, key) => {
      if (value.id == row_obj.id) {
        value.mark = row_obj.mark;
      }
      return true;
    });
  }

  clkButSearchStud() {
    //search student

    let result: any;
    this.teacherService.getStudentByInfo(this.searchStr).subscribe(student => {
      result = student;
      if (result != null) {
        this.student = result;
        this.update();
      } else {
        alert('Student not found');
      }
    });
  }

  clkButExit() {
    this.router.navigate(['title']);
  }
}
