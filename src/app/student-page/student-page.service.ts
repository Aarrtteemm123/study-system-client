import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentPageService {
  baseUrl = 'http://localhost:8000';
  constructor(private http: HttpClient) { }

  getStudent()
  {
    return this.http.get(this.baseUrl+'/student').pipe(map((data: any) => {
      return data;
    }));
  }
}
