import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Applicant } from '../../models/applicant/applicant';

const API_URL = ' http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(email: any): Observable<any> {
    return this.http.get<Applicant[]>(`${API_URL}/applicants/email/${email}`);
  }

  updateProfile(email: any, data: any): Observable<any> {
    return this.http.put(`${API_URL}/applicants/update/${email}`, data);
  }
}
