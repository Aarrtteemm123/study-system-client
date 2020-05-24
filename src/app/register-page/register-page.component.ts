import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Student} from '../models/student';
import {User} from '../models/user';
import {FormControl, Validators} from '@angular/forms';
import {Teacher} from '../models/teacher';
import {Admin} from '../models/admin';
import {RegisterService} from './register.service';
import {Subject} from '../models/subject';

interface Specialty {
  name: string;
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  student = new Student(new User('','','','','','student'),0,'',[]);
  teacher = new Teacher(new User('','','','','','teacher'),0,[],[]);
  admin = new Admin(new User('','','','','','admin'));

  studEmailFormControl = new FormControl('', [Validators.required, Validators.email,]);
  studLastNameControl = new FormControl('', [Validators.required,]);
  studFirstNameControl = new FormControl('', [Validators.required]);
  studGroupControl = new FormControl(0, [Validators.required,Validators.min(1)]);
  studLoginControl = new FormControl('', [Validators.required]);
  studPasswordControl = new FormControl('', [Validators.required]);
  studSpecialtyControl = new FormControl('', [Validators.required]);

  teacherEmailFormControl = new FormControl('', [Validators.required, Validators.email,]);
  teacherLastNameControl = new FormControl('', [Validators.required,]);
  teacherFirstNameControl = new FormControl('', [Validators.required]);
  teacherWorkExpControl = new FormControl(0, [Validators.required,Validators.min(0)]);
  teacherLoginControl = new FormControl('', [Validators.required]);
  teacherPasswordControl = new FormControl('', [Validators.required]);

  adminEmailFormControl = new FormControl('', [Validators.required, Validators.email,]);
  adminLastNameControl = new FormControl('', [Validators.required,]);
  adminFirstNameControl = new FormControl('', [Validators.required]);
  adminLoginControl = new FormControl('', [Validators.required]);
  adminPasswordControl = new FormControl('', [Validators.required]);

  specialties: Specialty[] = [{name: 'Software engineering'},
    {name: 'Computer engineering'}, {name: 'Cybersecurity'},
    {name: 'Data scientist'},{name: 'Computer science'}
  ];
  teacherSkills: string[] = ['Assembler','C/C++', 'Java','Python','JavaScript','C#',
    'Web design', 'Computer graphics', 'Math',
  'Project analysis','Network technology','English', 'ML']; // also subjects
  constructor(private router: Router,private registerService: RegisterService ) { }
  ngOnInit(): void {
  }

  clkButExit() {
    this.router.navigate(['title']);
  }

  isValidTeacherData()
  {
    return this.teacher.skillsLst.length!=0&&
      !this.teacherFirstNameControl.hasError('required')&&
      !this.teacherLastNameControl.hasError('required')&&
      !this.teacherLoginControl.hasError('required')&&
      !this.teacherPasswordControl.hasError('required')&&
      !this.teacherWorkExpControl.errors!=null&&
      !(this.teacherEmailFormControl.hasError('required')||
        this.teacherEmailFormControl.hasError('email'))

  }

  isValidAdminData()
  {
    return !this.adminFirstNameControl.hasError('required')&&
      !this.adminLastNameControl.hasError('required')&&
      !this.adminLoginControl.hasError('required')&&
      !this.adminPasswordControl.hasError('required')&&
      !(this.adminEmailFormControl.hasError('required')||
        this.adminEmailFormControl.hasError('email'))

  }

  isValidStudentData()
  {
    return !this.studFirstNameControl.hasError('required')&&
      !this.studLastNameControl.hasError('required')&&
      !this.studLoginControl.hasError('required')&&
      !this.studPasswordControl.hasError('required')&&
      !this.studSpecialtyControl.hasError('required')&&
      !this.studGroupControl.errors!=null&&
      !(this.studEmailFormControl.hasError('required')||
        this.studEmailFormControl.hasError('email'))

  }

  clkButRegStud() {
    // register student
    if(this.mathTask())
    {
      console.log(this.student);
      if (this.student.specialty === 'Software engineering')
      {
        this.student.subjectLst = [new Subject('Java',0),
          new Subject('Python',0), new Subject('JavaScript',0),
          new Subject('C#',0), new Subject('Web design',0)];
      }
      if (this.student.specialty === 'Computer engineering')
      {
        this.student.subjectLst = [new Subject('Assembler',0),
          new Subject('C/C++',0), new Subject('Math',0),
          new Subject('C#',0), new Subject('English',0)];
      }
      if (this.student.specialty === 'Cybersecurity')
      {
        this.student.subjectLst = [new Subject('JavaScript',0),
          new Subject('Network technology',0), new Subject('Web design',0),
          new Subject('Math',0), new Subject('English',0)];
      }
      if (this.student.specialty === 'Data scientist')
      {
        this.student.subjectLst = [new Subject('Python',0),
          new Subject('Ml',0), new Subject('English',0),
          new Subject('Math',0)];
      }
      if (this.student.specialty === 'Computer science')
      {
        this.student.subjectLst = [new Subject('Java',0),
          new Subject('Python',0), new Subject('JavaScript',0),
          new Subject('C#',0), new Subject('Web design',0),
          new Subject('Assembler',0),new Subject('C/C++',0),
          new Subject('Computer graphics',0),new Subject('Math',0),
          new Subject('Project analysis',0),new Subject('Network technology',0),
          new Subject('English',0),new Subject('ML',0)];
      }
      console.log(this.student);
      this.registerService.sendRequest(this.student).subscribe(isSaved => {
        console.log(isSaved);
        if(isSaved)
        {
          alert('Your request has been registered');
          this.router.navigate(['title']);
        }
        else
        {
          alert('Login and(or) password are already using');
        }
      });
    }
  }

  clkButRegTeacher() {
    // register teacher
    if(this.mathTask())
    {
      this.teacher.user.email = this.studEmailFormControl.value;
      this.teacher.id = new Date().getTime();
      console.log(this.teacher);
      this.registerService.sendRequest(this.teacher).subscribe(isSaved => {
        console.log(isSaved);
        if(isSaved)
        {
          alert('Your request has been registered');
          this.router.navigate(['title']);
        }
        else
        {
          alert('Login and(or) password are already using');
        }
      });
    }
  }

  getSkillsList($event) {
    this.teacher.skillsLst = $event;
  }

  clkButRegAdmin() {
    // register admin
    if(this.mathTask())
    {
      this.admin.user.email = this.studEmailFormControl.value;
      this.admin.id = new Date().getTime();
      console.log(this.admin);
      this.registerService.sendRequest(this.admin).subscribe(isSaved => {
        console.log(isSaved);
        if(isSaved)
        {
          alert('Your request has been registered');
          this.router.navigate(['title']);
        }
        else
        {
          alert('Login and(or) password are already using');
        }
      });
    }
  }

  mathTask()
  {
    let a = this.getRandomInt(1,100);
    let b = this.getRandomInt(1,100);
    let result = Number(prompt(a+' + '+b));
    if (a+b === result) return true;
    alert(a+' + '+b+' not equals '+result);
    return false;
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Включно з мінімальним та виключаючи максимальне значення

  }
}
