import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardData } from '../interfaces/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = 'https://localhost:44333/dashboard/Admin/dashboard';

  constructor(private http: HttpClient) {}

  // Lấy dữ liệu tổng quan cho dashboard
  getDashboardData(): Observable<DashboardData> {
    return this.http.get<DashboardData>(`${this.baseUrl}`);
  }

  // Lấy danh sách sản phẩm bán chạy
  getBestSellingProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/best-selling-products`);
  }

  // Lấy doanh thu theo tháng
  getMonthlyRevenues(): Observable<any> {
    return this.http.get(`${this.baseUrl}/monthly-revenues`);
  }
}
