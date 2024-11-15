import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../api/api.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() loginEvent = new EventEmitter<boolean>();
  isLoginSuccess = true;
  profileForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    captcha: new FormControl('', Validators.required)
  });

  captchaUrl: string = 'https://localhost:44333/auth/captcha/refresh';

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCaptcha();
  }

  loadCaptcha(): void {
    this.apiService.getCaptcha().subscribe(response => {
      sessionStorage.setItem("captchaCode", response.code);
      this.captchaUrl = `data:image/png;base64,${response.image}`;
    });
  }

  onLogin() {
    if (this.profileForm.valid) {
      const username = this.profileForm.value.username || '';
      const password = this.profileForm.value.password || '';
      const captcha = this.profileForm.value.captcha || '';
  
      // Gọi phương thức login từ authService và subscribe để xử lý phản hồi
      this.authService.login(username, password, captcha).subscribe(
        response => {
          // Xử lý thành công - đăng nhập thành công
          this.isLoginSuccess = true;
          this.loginEvent.emit(true);
          this.router.navigate(['/products']);
        },
        error => {
          // Xử lý lỗi - đăng nhập thất bại
          this.isLoginSuccess = false;
          this.loginEvent.emit(false);
  
          console.error('Error logging in:', error);
  
          // Kiểm tra nếu lỗi liên quan đến captcha
          var storedCaptchaCode = sessionStorage.getItem("captchaCode");
          if (captcha !== storedCaptchaCode) {
            this.loadCaptcha(); // Làm mới captcha nếu lỗi
          }
        }
      );
    }
  }  

  get username() {
    return this.profileForm.get('username');
  }

  get password() {
    return this.profileForm.get('password');
  }

  get captcha() {
    return this.profileForm.get('captcha');
  }
}
