import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DepositService } from '../../services/deposit.service';

@Component({
  selector: 'app-recharge',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recharge.component.html',
  styleUrl: './recharge.component.scss'
})
export class RechargeComponent {
  amount: number = 0;
  description: string = '';

  constructor(private depositService: DepositService, private router: Router) {}

  handleRecharge(): void {
    if (this.amount < 10000) {
      alert('Số tiền cần nạp phải lớn hơn hoặc bằng 10.000 VND.');
      return;
    }

    this.depositService.recharge(this.amount, this.description).subscribe({
      next: (response: any) => {
        if (response?.paymentUrl) {
          // Điều hướng đến VNPay
          window.location.href = response.paymentUrl;
        } else {
          alert('Không thể tạo liên kết thanh toán. Vui lòng thử lại.');
        }
      },
      error: (err) => {
        console.error('Lỗi khi nạp tiền:', err);
        alert('Đã xảy ra lỗi khi tạo liên kết thanh toán. Vui lòng thử lại.');
      },
    });
  }
}
