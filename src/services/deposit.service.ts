import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class DepositService {
    private baseUrl = 'https://localhost:44333/api/deposits';
  
    constructor(private http: HttpClient) {}

    // Nạp tiền
    recharge(amount: number, description: string ): Observable<any> {
        const payload = {
        amount: amount * 1000, // VNPay yêu cầu đơn vị là VND
        description: description,
        };
        return this.http.post(`${this.baseUrl}/recharge`, payload);
    }
  
    // Xử lý callback sau khi thanh toán thành công
    handlePaymentCallback(queryParams: string): Observable<any> {
        const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
        return this.http.get(`${this.baseUrl}/payment-callback?${queryParams}`, { headers });
    }
}