import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../../models/apply/application';

const baseUrl = ' http://localhost:3000';


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Application[]> {
    return this.http.get<Application[]>(baseUrl);
  }

  get(email: any): Observable<Application> {
    return this.http.get<Application>(`${baseUrl}/applications/${email}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl + '/applications/apply', data);
  }

  findByEmail(email: any): Observable<Application[]> {
    return this.http.get<Application[]>(`${baseUrl}/applications/email/${email}`);
  }

  update(email: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/applications/user/${email}`, data);
  }
}
