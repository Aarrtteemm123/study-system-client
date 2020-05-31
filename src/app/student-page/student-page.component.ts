import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Student} from '../models/student';
import {User} from '../models/user';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {StudentPageService} from './student-page.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css'],
  providers: [StudentPageService]
})

export class StudentPageComponent implements OnInit {
  student = new Student(new User('', '', '', '', '', 'student'), 0, '', []);
  displayedColumns: string[] = ['Id', 'name', 'mark'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource = new MatTableDataSource(this.student.subjectLst);

  constructor(private router: Router, private studentService: StudentPageService) {
  }

  ngOnInit(): void {
    this.studentService.getStudent().subscribe(data => {
      if (data != null) {
        this.student = data;
      } else {
        this.router.navigate(['title']);
      }
    });
    this.dataSource.sort = this.sort;
  }

  update() {
    this.dataSource = new MatTableDataSource(this.student.subjectLst);
  }

  clkButExit() {
    this.router.navigate(['title']);
  }
}
