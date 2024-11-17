import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userProfileForm!: FormGroup;
  userData!: User;
  loading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUserData();
  }

  // Initialize the form
  initForm(): void {
    this.userProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      address: [''],
    });
  }

  // Load user data from API
  loadUserData(): void {
    this.loading = true;
    this.userService.getUserProfile().subscribe({
      next: (user: User) => {
        this.userData = user;
        this.userProfileForm.patchValue(user); // Bind data to form
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Không thể tải thông tin người dùng.';
        console.error(err);
        this.loading = false;
      },
    });
  }

  // Save updated user information
  saveChanges(): void {
    if (this.userProfileForm.valid) {
      this.loading = true;
      const updatedUser = { ...this.userData, ...this.userProfileForm.value };

      this.userService.updateUser(updatedUser.id, updatedUser).subscribe({
        next: () => {
          this.successMessage = 'Cập nhật thông tin thành công.';
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = 'Cập nhật thông tin thất bại.';
          console.error(err);
          this.loading = false;
        },
      });
    }
  }

  // Delete user account
  deleteAccount(): void {
    if (confirm('Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác!')) {
      this.loading = true;
      this.userService.deleteUser(this.userData.id).subscribe({
        next: () => {
          localStorage.clear();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage = 'Xóa tài khoản thất bại.';
          console.error(err);
          this.loading = false;
        },
      });
    }
  }
}
