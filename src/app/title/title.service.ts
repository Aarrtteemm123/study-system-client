import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  baseUrl = 'http://localhost:8000';
  constructor(private http: HttpClient) { }

  login(login,password,typeUser)
  {
    let obj = {
      login: login,
      password: password,
      typeUser: typeUser
    };
    return this.http.post(this.baseUrl + '/title', obj);
  }
}
