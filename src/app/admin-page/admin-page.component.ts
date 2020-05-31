import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {MatTable} from '@angular/material/table';
import {Admin} from '../models/admin';
import {MatDialog} from '@angular/material/dialog';
import {StudentDialogBoxComponent} from '../student-dialog-box/student-dialog-box.component';
import {AdminDialogBoxComponent} from '../admin-dialog-box/admin-dialog-box.component';
import {TeacherDialogBoxComponent} from '../teacher-dialog-box/teacher-dialog-box.component';
import {AdminService} from './admin.service';
import {Subject} from '../models/subject';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  displayedColumnsStud: string[] = ['id', 'name', 'last name', 'email', 'group', 'specialty', 'action'];
  dataSrcRequestStud = [];
  dataSrcAllStud = [];

  displayedColumnsTeacher: string[] = ['id', 'name', 'last name', 'email', 'work experience', 'skills', 'action'];
  displayedColumnsAllTeachers: string[] = ['id', 'name', 'last name', 'email', 'work experience', 'groups', 'skills', 'action'];
  dataSrcRequestTeachers = [];
  dataSrcAllTeachers = [];

  displayedColumnsAdmin: string[] = ['id', 'name', 'last name', 'email', 'action'];
  dataSrcRequestAdmins = [];
  dataSrcAllAdmins = [];
  all = [];
  admin = new Admin(new User('', '', '', '', '', 'admin'));

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(private router: Router, private adminService: AdminService, public dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.adminService.getAllData().subscribe(data => {
      if (data.admin != null) {
        this.dataSrcRequestStud = data.requestStud;
        this.dataSrcAllStud = data.allStud;
        this.dataSrcRequestTeachers = data.requestTeachers;
        this.dataSrcAllTeachers = data.allTeachers;
        this.dataSrcRequestAdmins = data.requestAdmins;
        this.dataSrcAllAdmins = data.allAdmins;
        this.admin = data.admin;
      } else {
        this.router.navigate(['title']);
      }
    });
  }

  openTeacherDialog(action, obj, source) {
    obj.action = action;
    const dialogRef = this.dialog.open(TeacherDialogBoxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Update') {
        result.data.groups = result.data.groups.split(',').map(Number);
        this.adminService.updateUser(result.data).subscribe(data => {
          this.updateTeacher(result.data);
        });
      } else if (result.event == 'Delete') {
        if (source === 'request') {
          this.adminService.deleteUser(result.data).subscribe(data => {
            this.dataSrcRequestTeachers = this.deleteUser(result.data, this.dataSrcRequestTeachers);
          });
        } else if (source === 'all') {
          this.adminService.deleteUser(result.data).subscribe(data => {
            this.dataSrcAllTeachers = this.deleteUser(result.data, this.dataSrcAllTeachers);
          });
        }
      } else if (result.event === 'Cancel') {
        this.adminService.getAllData().subscribe(data => {
          this.dataSrcAllTeachers = data.allTeachers;
        });
      }
    });
  }

  updateTeacher(row_obj) {
    this.dataSrcAllTeachers = this.dataSrcAllTeachers.filter((value, key) => {
      if (value.id == row_obj.id) {
        value.user.firstName = row_obj.user.firstName;
        value.user.lastName = row_obj.user.lastName;
        value.user.email = row_obj.user.email;
        value.workExperience = row_obj.workExperience;
        value.groups = row_obj.groups;
        value.skillsLst = row_obj.skillsLst;
        console.log(value.groups);
      }
      return true;
    });
  }

  openAdminDialog(action, obj, source) {
    obj.action = action;
    const dialogRef = this.dialog.open(AdminDialogBoxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Update') {
        this.adminService.updateUser(result.data).subscribe(data => {
          this.updateAdmin(result.data);
        });
      } else if (result.event == 'Delete') {
        if (source === 'request') {
          this.adminService.deleteUser(result.data).subscribe(data => {
            this.dataSrcRequestAdmins = this.deleteUser(result.data, this.dataSrcRequestAdmins);
          });
        } else if (source === 'all') {
          this.adminService.deleteUser(result.data).subscribe(data => {
            this.dataSrcAllAdmins = this.deleteUser(result.data, this.dataSrcAllAdmins);
          });
        }
      } else if (result.event === 'Cancel') {
        this.adminService.getAllData().subscribe(data => {
          this.dataSrcAllAdmins = data.allAdmins;
        });
      }
    });
  }

  updateAdmin(row_obj) {
    this.dataSrcAllAdmins = this.dataSrcAllAdmins.filter((value, key) => {
      if (value.id == row_obj.id) {
        value.user.firstName = row_obj.user.firstName;
        value.user.lastName = row_obj.user.lastName;
        value.user.email = row_obj.user.email;
      }
      return true;
    });
  }

  openStudDialog(action, obj, source) {
    obj.action = action;
    const dialogRef = this.dialog.open(StudentDialogBoxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Update') {
        this.adminService.updateUser(result.data).subscribe(data => {
          this.updateStud(result.data);
        });
      } else if (result.event === 'Delete') {
        if (source === 'request') {
          this.adminService.deleteUser(result.data).subscribe(data => {
            this.dataSrcRequestStud = this.deleteUser(result.data, this.dataSrcRequestStud);
          });
        } else if (source === 'all') {
          this.adminService.deleteUser(result.data).subscribe(data => {
            this.dataSrcAllStud = this.deleteUser(result.data, this.dataSrcAllStud);
          });
        }
      } else if (result.event === 'Cancel') {
        this.adminService.getAllData().subscribe(data => {
          this.dataSrcAllStud = data.allStud;
        });
      }
    });
  }

  updateStud(row_obj) {
    this.dataSrcAllStud = this.dataSrcAllStud.filter((value, key) => {
      if (value.id === row_obj.id) {
        value.user.firstName = row_obj.user.firstName;
        value.user.lastName = row_obj.user.lastName;
        value.user.email = row_obj.user.email;
        value.group = row_obj.group;
        value.specialty = row_obj.specialty;
        if (value.specialty === 'Software engineering') {
          value.subjectLst = [new Subject('Java', 0),
            new Subject('Python', 0), new Subject('JavaScript', 0),
            new Subject('C#', 0), new Subject('Web design', 0)];
        }
        if (value.specialty === 'Computer engineering') {
          value.subjectLst = [new Subject('Assembler', 0),
            new Subject('C/C++', 0), new Subject('Math', 0),
            new Subject('C#', 0), new Subject('English', 0)];
        }
        if (value.specialty === 'Cybersecurity') {
          value.subjectLst = [new Subject('JavaScript', 0),
            new Subject('Network technology', 0), new Subject('Web design', 0),
            new Subject('Math', 0), new Subject('English', 0)];
        }
        if (value.specialty === 'Data scientist') {
          value.subjectLst = [new Subject('Python', 0),
            new Subject('Ml', 0), new Subject('English', 0),
            new Subject('Math', 0)];
        }
        if (value.specialty === 'Computer science') {
          value.subjectLst = [new Subject('Java', 0),
            new Subject('Python', 0), new Subject('JavaScript', 0),
            new Subject('C#', 0), new Subject('Web design', 0),
            new Subject('Assembler', 0), new Subject('C/C++', 0),
            new Subject('Computer graphics', 0), new Subject('Math', 0),
            new Subject('Project analysis', 0), new Subject('Network technology', 0),
            new Subject('English', 0), new Subject('ML', 0)];
        }
      }
      return true;
    });
  }

  deleteUser(row_obj, dataSource) {
    dataSource = dataSource.filter((value, key) => {
      return value.id != row_obj.id;
    });
    return dataSource;
  }

  confirmUser(row_obj, dataSourceStr) {
    this.adminService.confirmUser(row_obj).subscribe(isExistUser => {
      if (!isExistUser) {
        alert('User already exist');
      } else {
        if (dataSourceStr === 'RequestStud') {
          this.dataSrcRequestStud = this.deleteUser(row_obj, this.dataSrcRequestStud);
          this.dataSrcAllStud.push(row_obj);
          this.dataSrcAllStud.push({id: -1});
          this.dataSrcRequestStud = this.deleteUser({id: -1}, this.dataSrcRequestStud);
        }
        if (dataSourceStr === 'RequestTeachers') {
          this.dataSrcRequestTeachers = this.deleteUser(row_obj, this.dataSrcRequestTeachers);
          this.dataSrcAllTeachers.push(row_obj);
          this.dataSrcAllTeachers.push({id: -1});
          this.dataSrcRequestTeachers = this.deleteUser({id: -1}, this.dataSrcRequestTeachers);
        }
        if (dataSourceStr === 'RequestAdmins') {
          this.dataSrcRequestAdmins = this.deleteUser(row_obj, this.dataSrcRequestAdmins);
          this.dataSrcAllAdmins.push(row_obj);
          this.dataSrcAllAdmins.push({id: -1});
          this.dataSrcAllAdmins = this.deleteUser({id: -1}, this.dataSrcAllAdmins);
        }
      }
    });
  }

  clkButConfirmAllTeachers() {
    // save all teachers in db
    if (this.mathTask()) {
      let buffer = Object.assign({}, this.dataSrcRequestTeachers);
      let size = this.dataSrcRequestTeachers.length;
      for (let i = 0; i < size; i++) {
        let obj = buffer[i];
        this.adminService.confirmUser(obj).subscribe(isExistUser => {
          if (!isExistUser) {
            alert('User with id = ' + obj.id + ' already exist');
          } else {
            this.dataSrcAllTeachers.push(obj);
            this.dataSrcRequestTeachers = this.deleteUser(obj, this.dataSrcRequestTeachers);
          }
        });
      }
    }
  }

  updateData() {
    this.dataSrcRequestAdmins.push({id: -1});
    this.dataSrcRequestAdmins = this.deleteUser({id: -1}, this.dataSrcRequestAdmins);
    this.dataSrcAllAdmins.push({id: -1});
    this.dataSrcAllAdmins = this.deleteUser({id: -1}, this.dataSrcAllAdmins);
    this.dataSrcRequestStud.push({id: -1});
    this.dataSrcRequestStud = this.deleteUser({id: -1}, this.dataSrcRequestStud);
    this.dataSrcAllStud.push({id: -1});
    this.dataSrcAllStud = this.deleteUser({id: -1}, this.dataSrcAllStud);
    this.dataSrcAllTeachers.push({id: -1});
    this.dataSrcAllTeachers = this.deleteUser({id: -1}, this.dataSrcAllTeachers);
    this.dataSrcRequestTeachers.push({id: -1});
    this.dataSrcRequestTeachers = this.deleteUser({id: -1}, this.dataSrcRequestTeachers);
  }

  clkButDeleteAllAdmins() {
    if (this.mathTask()) {
      this.adminService.deleteAll('admins').subscribe(isExistUser => {
      });
      this.dataSrcAllAdmins = [];
    }
  }

  clkButConfirmAllStud() {
    // save all students in db
    if (this.mathTask()) {
      let buffer = Object.assign({}, this.dataSrcRequestStud);
      let size = this.dataSrcRequestStud.length;
      for (let i = 0; i < size; i++) {
        let obj = buffer[i];
        this.adminService.confirmUser(obj).subscribe(isExistUser => {
          if (!isExistUser) {
            alert('User with id = ' + obj.id + ' already exist');
          } else {
            this.dataSrcAllStud.push(obj);
            this.dataSrcRequestStud = this.deleteUser(obj, this.dataSrcRequestStud);
          }
        });
      }
    }
  }

  clkButDeleteAllReqStud() {
    if (this.mathTask()) {
      this.adminService.deleteAll('students_requests').subscribe(isExistUser => {
      });
      this.dataSrcRequestStud = [];
    }
  }

  clkButDeleteAllStud() {
    if (this.mathTask()) {
      this.adminService.deleteAll('students').subscribe(isExistUser => {
      });
      this.dataSrcAllStud = [];
    }
  }

  clkButDeleteReqTeachers() {
    if (this.mathTask()) {
      this.adminService.deleteAll('teachers_requests').subscribe(isExistUser => {
      });
      this.dataSrcRequestTeachers = [];
    }
  }

  clkButDeleteAllTeachers() {
    if (this.mathTask()) {
      this.adminService.deleteAll('teachers').subscribe(isExistUser => {
      });
      this.dataSrcAllTeachers = [];
    }
  }

  clkButConfirmAllAdmins() {
    // save all admins in db
    if (this.mathTask()) {
      let buffer = Object.assign({}, this.dataSrcRequestAdmins);
      let size = this.dataSrcRequestAdmins.length;
      for (let i = 0; i < size; i++) {
        let obj = buffer[i];
        this.adminService.confirmUser(obj).subscribe(isExistUser => {
          if (!isExistUser) {
            alert('User with id = ' + obj.id + ' already exist');
          } else {
            this.dataSrcAllAdmins.push(obj);
            this.dataSrcRequestAdmins = this.deleteUser(obj, this.dataSrcRequestAdmins);
          }
        });
      }
    }
  }

  clkButDeleteAllReqAdmins() {
    if (this.mathTask()) {
      this.adminService.deleteAll('admins_requests').subscribe(isExistUser => {
      });
      this.dataSrcRequestAdmins = [];
    }
  }

  mathTask() {
    let a = this.getRandomInt(1, 100);
    let b = this.getRandomInt(1, 100);
    let result = Number(prompt(a + ' + ' + b));
    if (a + b === result) {
      return true;
    }
    alert(a + ' + ' + b + ' not equals ' + result);
    return false;
  }

  clkButExit() {
    this.router.navigate(['title']);
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Включно з мінімальним та виключаючи максимальне значення

  }
}
