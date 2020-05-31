import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  //baseUrl = 'http://localhost:8000';
  baseUrl = 'https://lit-journey-87714.herokuapp.com';

  constructor(private http: HttpClient) {
  }

  updateMarks(student) {
    return this.http.post(this.baseUrl + '/teacher/updateMarks', {data: student});
  }

  getStudentByInfo(strInfo) {
    return this.http.post(this.baseUrl + '/teacher', {info: strInfo});
  }

  getTeacher() {
    return this.http.get(this.baseUrl + '/teacher').pipe(map((data: any) => {
      return data;
    }));
  }
}
