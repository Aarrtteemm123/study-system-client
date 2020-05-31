import {User} from './user';

export class Admin {
  user: User;
  id = 0;

  constructor(user: User) {
    this.id = new Date().getTime();
    this.user = user;
  }
}
