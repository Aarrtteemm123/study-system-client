export class User {
  firstName = '';
  lastName = '';
  email = '';
  login = '';
  password = '';
  typeUser = '';

  constructor(firstName: string, lastName: string, email: string, login: string, password: string, typeUser: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.login = login;
    this.password = password;
    this.typeUser = typeUser;
  }
}
