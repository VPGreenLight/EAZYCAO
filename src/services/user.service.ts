import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:44333/users'; // Địa chỉ API Backend

  constructor(private http: HttpClient) {}

  getUsers(): Observable<{ items: User[] }> {
    return this.http.get<{ items: User[] }>(`${this.baseUrl}`);
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
}
