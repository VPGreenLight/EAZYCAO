import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = "https://localhost:44333";
  
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data, { withCredentials: true });
  } 

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/register`, data, { withCredentials: true });
  }

  getCaptcha(): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/captcha/refresh`, { withCredentials: true });
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
  // getUserProfile(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/users/me`);
  // }
}
