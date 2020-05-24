import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl = 'http://localhost:8000';
  constructor(private http: HttpClient) { }

  sendRequest(obj)
  {
    return this.http.post(this.baseUrl + '/register', obj);
  }
}
