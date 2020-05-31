import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  //baseUrl = 'http://localhost:8000';
  baseUrl = 'https://lit-journey-87714.herokuapp.com';

  constructor(private http: HttpClient) {
  }

  login(login, password, typeUser) {
    let obj = {
      login: login,
      password: password,
      typeUser: typeUser
    };
    return this.http.post(this.baseUrl + '/title', obj);
  }
}
