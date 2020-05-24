import {User} from './user';
import {Subject} from './subject';

export class Student {
  user:User;
  id = 0;
  group = 0;
  specialty = '';
  subjectLst = [];


  constructor(user: User, group: number, specialty: string, subjectLst: any[]) {
    this.user = user;
    this.id = new Date().getTime();
    this.group = group;
    this.specialty = specialty;
    this.subjectLst = subjectLst;
  }
}
