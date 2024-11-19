import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = "https://localhost:44333/auth";
  
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data, { withCredentials: true });
  } 

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, data, { withCredentials: true });
  }

  getCaptcha(): Observable<any> {
    return this.http.get(`${this.baseUrl}/captcha/refresh`, { withCredentials: true });
  }
}
