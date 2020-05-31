import {User} from './user';

export class Teacher {
  user: User;
  id = 0;
  workExperience = 0;
  groups = [];
  skillsLst = [];

  constructor(user: User, workExperience: number, groups: number[], skillsLst: string[]) {
    this.id = new Date().getTime();
    this.user = user;
    this.workExperience = workExperience;
    this.groups = groups;
    this.skillsLst = skillsLst;
  }
}
