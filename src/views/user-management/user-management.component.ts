import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../../interfaces/user.model';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  loading: boolean = true;

  isEditMode: boolean = false;
  isAddMode: boolean = false;
  selectedUser: User | null = null; 
  editForm: FormGroup;
  
  constructor(private userService: UserService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      isActive: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data.items;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to fetch users:', error);
        this.loading = false;
      }
    });
  }

  onAddUser(): void {
    this.isAddMode = true;
    this.editForm.reset({ isActive: true });
  }

  onEditUser(user: User): void {
    this.isEditMode = true;
    this.selectedUser = user;

    // Điền dữ liệu của người dùng vào form
    this.editForm.patchValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      isActive: user.isActive
    });
  }

  saveUser(): void {
    if (this.editForm.valid) {
      const user = this.editForm.value;

      if (this.isAddMode) {
        // Thêm mới người dùng
        this.userService.createUser(user).subscribe({
          next: () => {
            alert('Thêm người dùng thành công!');
            this.isAddMode = false;
            this.getUsers(); // Refresh danh sách
          },
          error: (err) => {
            console.error('Failed to add user:', err);
            alert('Thêm người dùng thất bại!');
          }
        });
      } else if (this.isEditMode && this.selectedUser) {
        // Sửa người dùng
        const updatedUser = { ...this.selectedUser, ...this.editForm.value };

        this.userService.updateUser(this.selectedUser.id, updatedUser).subscribe({
          next: () => {
            alert('Cập nhật người dùng thành công!');
            this.isEditMode = false;
            this.getUsers();
          },
          error: (err) => {
            console.error('Failed to update user:', err);
            alert('Cập nhật thất bại!');
          }
        });
      }
    }
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.isAddMode = false;
    this.selectedUser = null;
  }

  deleteUser(userId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          alert('Xóa người dùng thành công!');
          this.getUsers(); // Load lại danh sách người dùng sau khi xóa
        },
        error: (err) => {
          console.error('Failed to delete user:', err);
          alert('Xóa thất bại!');
        }
      });
    }
  }
}
