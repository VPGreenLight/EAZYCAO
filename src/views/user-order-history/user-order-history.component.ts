import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { CurrencySuffixPipe } from "../../services/pipes/currency-suffix.pipe";

@Component({
  selector: 'app-user-order-history',
  standalone: true,
  imports: [CommonModule, CurrencySuffixPipe],
  templateUrl: './user-order-history.component.html',
  styleUrls: ['./user-order-history.component.scss'],
})
export class UserOrderHistoryComponent implements OnInit {
  transactionHistory: any[] = [];
  depositHistory: any[] = [];
  currentView: 'order' | 'deposit' = 'order'; // Mặc định là lịch sử giao dịch
  
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadOrderHistory();
  }

  // Lấy lịch sử giao dịch
  loadOrderHistory(): void {
    this.userService.getOrderHistory().subscribe({
      next: (data) => {
        this.transactionHistory = data.map((order) => ({
          ...order,
          showDetails: false, // Thêm thuộc tính showDetails để ẩn/hiện chi tiết
        }));
      },
      error: (err) => {
        console.error('Error fetching order history:', err);
      },
    });
  }

  // Lấy lịch sử nạp tiền
  loadDepositHistory(): void {
    this.userService.getDepositHistory().subscribe({
      next: (data) => {
        this.depositHistory = data;
      },
      error: (err) => {
        console.error('Error fetching deposit history:', err);
      },
    });
  }

  // Chuyển đổi giữa hai bảng
  switchView(view: 'order' | 'deposit'): void {
    this.currentView = view;
    if (view === 'order') {
      this.loadOrderHistory();
    } else {
      this.loadDepositHistory();
    }
  }

    // Ẩn/hiện chi tiết đơn hàng
    toggleDetails(order: any): void {
      order.showDetails = !order.showDetails;
    }
}
