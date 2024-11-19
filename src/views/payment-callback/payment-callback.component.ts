import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepositService } from '../../services/deposit.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-callback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-callback.component.html',
  styleUrls: ['./payment-callback.component.scss'],
})
export class PaymentCallbackComponent implements OnInit {
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private depositService: DepositService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    // Lấy queryParams từ URL callback
    this.route.queryParams.subscribe((params) => {
      if (params['vnp_ResponseCode']) {
        this.processCallback(params);
      } else {
        alert('Dữ liệu callback không hợp lệ.');
        this.router.navigate(['/cart']);
      }
    });
  }

  private processCallback(params: any): void {
    // Gửi API để xử lý callback
    this.depositService.handlePaymentCallback(this.getQueryString(params)).subscribe({
      next: (response: any) => {
        if (!localStorage.getItem('token')) {
          alert('Bạn cần đăng nhập để xử lý thanh toán.');
          this.router.navigate(['/login']);
        }
        if (response?.message === 'Payment successful.') {
          alert('Nạp tiền thành công!');
          this.router.navigate(['/cart']); // Điều hướng về giỏ hàng
        } else {
          alert('Nạp tiền thất bại: ' + response.Message);
          this.router.navigate(['/cart']);
        }
      },
      error: (err) => {
        console.error('Lỗi khi xử lý callback:', err);
        alert('Đã xảy ra lỗi khi xử lý callback.');
        this.router.navigate(['/cart']);
      },
    });
  }

  // Chuyển đổi queryParams thành queryString
  private getQueryString(params: any): string {
    return Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
  }
}
