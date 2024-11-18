import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
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
export class NavbarComponent{
  cartItemCount: number = 0; // Biến để lưu số lượng sản phẩm trong giỏ hàng
  theCaoExpanded: boolean = false; // Trạng thái mở/đóng của danh mục Thẻ Cào
  giaiTriExpanded: boolean = false; // Trạng thái mở/đóng của danh mục Giải Trí

  constructor(private cartService: CartService) {}

  // Hàm toggle để mở/đóng các danh mục
  toggleCategory(category: string): void {
    if (category === 'theCao') {
      this.theCaoExpanded = !this.theCaoExpanded;
    } else if (category === 'giaiTri') {
      this.giaiTriExpanded = !this.giaiTriExpanded;
    }
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