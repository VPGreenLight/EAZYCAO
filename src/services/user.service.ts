import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.model';
import { PagedResponse } from '../interfaces/page.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:44333/users'; // Địa chỉ API Backend

  constructor(private http: HttpClient) {}

  getUsers(pageIndex: number, pageSize: number): Observable<PagedResponse<User>> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<PagedResponse<User>>(`${this.baseUrl}`, { params });
  }

  createUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, newUser);
  }

  updateUser(userId: number, updatedUser: User): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${userId}`, updatedUser);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}`);
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  getDepositHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/deposit-history`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  getOrderHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/order-history`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
