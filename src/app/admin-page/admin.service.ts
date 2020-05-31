import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {
  }

  updateUser(user) {
    return this.http.post(this.baseUrl + '/admin/update', {data: user});
  }

  confirmUser(user) {
    return this.http.post(this.baseUrl + '/admin/confirm', {data: user});
  }

  deleteUser(user) {
    return this.http.post(this.baseUrl + '/admin/delete', {data: user});
  }

  deleteAll(tableName) {
    return this.http.post(this.baseUrl + '/admin/deleteAll', {data: tableName});
  }

  getAllData() {
    return this.http.get(this.baseUrl + '/admin').pipe(map((data: any) => {
      return data;
    }));
  }
}
