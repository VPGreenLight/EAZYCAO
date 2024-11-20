import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '../../interfaces/user.model';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PagedResponse } from '../../interfaces/page.model';
import { CurrencySuffixPipe } from "../../services/pipes/currency-suffix.pipe";

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  totalItems = 0;
  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 0;
  loading: boolean = true;

  isEditMode: boolean = false;
  isAddMode: boolean = false;
  selectedUser: User | null = null; 
  editForm: FormGroup;
  
  constructor(private userService: UserService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      isActive: [true, Validators.required],
      roleId: [2, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers(this.currentPage, this.itemsPerPage).subscribe(
      (response: PagedResponse<User>) => {
        this.users = response.data.filter(user => !user.isDelete);
        this.totalItems = response.totalCount;
        this.totalPages = response.totalPage;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
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
    username: user.userName,
    phone: user.phone,
    address: user.address,
    isActive: user.isActive, // Đảm bảo sử dụng giá trị đúng từ user
    roleId: user.roleId || 2 // Mặc định roleId là 2 nếu không có
    });
  }

  saveUser(): void {
    if (this.editForm.valid) {
      const user = this.editForm.value;
      console.log(user); // Xem thông tin người dùng nhập vào
  
      if (this.isAddMode) {
        // Thêm mới người dùng
        this.userService.createUser(user).subscribe({
          next: () => {
            alert('Thêm người dùng thành công!');
            this.isAddMode = false; // Chuyển sang chế độ xem hoặc chế độ khác
            this.getUsers(); // Refresh danh sách người dùng
          },
          error: (err) => {
            console.error('Thêm người dùng thất bại:', err);
            alert('Thêm người dùng thất bại!');
          }
        });
      } else if (this.isEditMode && this.selectedUser) {
        // Kiểm tra xem selectedUser có tồn tại và hợp lệ không
        const updatedUser = { ...this.selectedUser, ...user }; // Kết hợp thông tin sửa đổi với người dùng đã chọn
  
        this.userService.updateUser(updatedUser.id, updatedUser).subscribe({
          next: () => {
            alert('Cập nhật người dùng thành công!');
            this.isEditMode = false; // Chuyển về chế độ mặc định sau khi sửa
            this.selectedUser = null; // Reset người dùng đã chọn
            this.getUsers(); // Refresh danh sách người dùng
          },
          error: (err) => {
            console.error('Cập nhật người dùng thất bại:', err);
            alert('Cập nhật người dùng thất bại!');
          }
        });
      }
    } else {
      alert('Dữ liệu không hợp lệ! Vui lòng kiểm tra lại.');
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
  // Trả về danh sách số trang
  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  // Chuyển sang trang khác
  onPageChange(page: number): void {
    this.currentPage = page;
    console.log(`Moved to page ${page}`);
  }

  // Chuyển trang trước
  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getUsers();
    }
  }

  // Chuyển trang sau
  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getUsers();
    }
  }
}
