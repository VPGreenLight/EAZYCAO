import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)])
  });

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      this.authService.register(formData).subscribe({
        next: () => {
          alert("Registration successful!");
          this.router.navigate(['/products']); // Chuyển hướng sau khi đăng ký thành công
        },
        error: (error) => {
          console.error("Registration failed", error);
          alert("Registration failed. Please try again.");
        }
      });
    } else {
      this.registerForm.markAllAsTouched(); // Đảm bảo hiển thị lỗi cho các trường không hợp lệ
    }
  }

  // Getter cho form control để dễ truy cập trong HTML
  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get userName() { return this.registerForm.get('userName'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get address() { return this.registerForm.get('address'); }
  get phone() { return this.registerForm.get('phone'); }
}
