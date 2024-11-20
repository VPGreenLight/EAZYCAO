import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ 
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  cartItemCount: number = 0; 
  theCaoExpanded: boolean = false; 
  giaiTriExpanded: boolean = false;
  laAdmin: boolean = false;

  constructor(private cartService: CartService,
    private userService: UserService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.checkUserRole();
  }

  // Hàm toggle để mở/đóng các danh mục
  toggleCategory(category: string): void {
    if (category === 'theCao') {
      this.theCaoExpanded = !this.theCaoExpanded;
    } else if (category === 'giaiTri') {
      this.giaiTriExpanded = !this.giaiTriExpanded;
    }
  }

  searchByCategory(keyword: string): void {
    // Đẩy keyword vào service tìm kiếm
    this.searchService.updateKeyword(keyword);
  }

  checkUserRole(): void {
    this.userService.getUserProfile().subscribe(
      (user) => {
        this.laAdmin = user.roleId === 1;
      },
      (error) => {
        console.error('Lỗi khi kiểm tra role:', error);
      }
    );
  }

  // ngOnInit(): void {
  //   this.updateCartItemCount();

  //   // Lắng nghe sự kiện thay đổi số lượng sản phẩm trong giỏ
  //   this.cartService.cartItemsUpdated.subscribe(() => {
  //     this.updateCartItemCount();
  //   });
  // }

  // updateCartItemCount(): void {
  //   // Lấy số lượng sản phẩm từ service
  //   this.cartItemCount = this.cartService.getTotalCartItemCount();
  // }
}