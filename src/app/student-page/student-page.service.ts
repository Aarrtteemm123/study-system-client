import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentPageService {
  //baseUrl = 'http://localhost:8000';
  baseUrl = 'https://lit-journey-87714.herokuapp.com';

  constructor(private http: HttpClient) {
  }

  getStudent() {
    return this.http.get(this.baseUrl + '/student').pipe(map((data: any) => {
      return data;
    }));
  }
}
