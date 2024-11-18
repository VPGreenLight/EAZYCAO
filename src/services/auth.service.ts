import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api/api.service';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private apiService: ApiService,
        private router: Router
    ) {}

    isLoggedIn(): boolean {
        const token = localStorage.getItem("token");
        return !!token;
    }

    login(username: string, password: string, captcha: string): Observable<any> {
        const payload = { userName: username, password: password, captcha: captcha };
        return this.apiService.login(payload).pipe(
            tap(response => {
                localStorage.setItem('token', response.token);
            })
        );
    }

    register(formData: any): Observable<any> {
        return this.apiService.register(formData).pipe(
            tap(response => {
                if (response.token) {
                    localStorage.setItem('token', response.token); // Lưu token vào localStorage
                }
            })
        );
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/login']);
    }

}
