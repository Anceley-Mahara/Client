import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Renewal } from '../../models/renewal/renewal';

const baseUrl = 'http://localhost:8080/api/applications';

@Injectable({
  providedIn: 'root'
})
export class RenewVisaService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  getAll(): Observable<Renewal[]> {
    return this.http.get<Renewal[]>(baseUrl);
  }
}
