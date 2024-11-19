import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interfaces/cart.model';
import { CurrencySuffixPipe } from "../../services/pipes/currency-suffix.pipe";
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    CurrencySuffixPipe
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalPayable: number = 0;
  discountedTotal: number = 0;
  balance: number = 0;
  requiredAmount: number = 0;
  isCouponExpanded: boolean = false;
  couponCode: string = '';

  constructor(
    private cartService: CartService, 
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCartItems();
    this.loadUserBalance();
  }

  // Load giỏ từ API
  loadCartItems() {
    this.cartService.getCart().subscribe(
      (response) => {
        this.cartItems = response.items;
        this.totalPrice = response.totalAmount;
        this.calculateRequiredAmount();
        console.log('Loaded cart items từ loadCartItems:', this.cartItems);
      },
      (error) => {
        console.error('Error loading cart items:', error);
      }
    );
  }

  // Load số dư tk từ API
  loadUserBalance() {
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        this.balance = user.money; // Gán số dư tài khoản từ API
        this.calculateRequiredAmount(); // Cập nhật số tiền cần nạp thêm
      },
      error: (err) => {
        console.error('Lỗi khi tải số dư tài khoản:', err);
      }
    });
  }

  // Calculate required amount
  calculateRequiredAmount() {
    this.requiredAmount = this.totalPrice > this.balance ? this.totalPrice - this.balance : 0;
  }

  // Thêm sản phẩm vào giỏ
  addToCart(productId: number, quantity: number) {
    this.cartService.addToCart(productId, quantity).subscribe(() => {
      this.loadCartItems();
    });
  }

  // Tăng số lượng
  increaseQuantity(item: CartItem) {
    this.cartService.increaseQuantity(item.productId).subscribe(() => {
      item.quantity++;
      this.calculateTotals();
    });
  }

  // Giảm số lượng
  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.decreaseQuantity(item.productId).subscribe(() => {
        item.quantity--;
        this.calculateTotals();
      });
    }
  }

  // Xóa khỏi giỏ
  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.productId).subscribe(() => {
      this.cartItems = this.cartItems.filter((cartItem) => cartItem.productId !== item.productId);
      this.calculateTotals();
    });
  }

  // Tính tổng tiền
  calculateTotals() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.calculateRequiredAmount();
  }

  // Mở rộng/thu gọn nhập mã ưu đãi
  toggleCoupon() {
    this.isCouponExpanded = !this.isCouponExpanded;
  }

  // Gửi mã giảm giá
  applyVoucherCode(): void {
    if (this.couponCode.trim()) {
      this.cartService.applyVoucher(this.couponCode).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.discountedTotal = response.total;
            this.calculateRequiredAmount();
            alert('Áp dụng mã giảm giá thành công!');
          } else {
            alert(response.message || 'Mã giảm giá không hợp lệ.');
          }
        },
        error: (err) => {
          console.error('Error applying voucher:', err);
          alert('Không thể áp dụng mã giảm giá.');
        },
      });
    } else {
      alert('Vui lòng nhập mã giảm giá.');
    }
  }

  // Thanh toán bằng số dư tài khoản
  payWithBalance(): void {
    this.cartService.checkoutWithBalance().subscribe({
      next: (response: any) => {
        const result = response?.value;
        if (result?.success) {
          this.router.navigate(['/payment-successful']);
        } else {
          alert(result?.message || 'Số dư không đủ để thanh toán.');
        }
      },
      error: (err) => {
        console.error('Error during checkout:', err);
        alert('Thanh toán thất bại.');
      },
    });
  }
}
