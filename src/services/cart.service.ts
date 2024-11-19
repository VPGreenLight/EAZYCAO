import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../interfaces/cart.model';

interface CartResponse {
    items: CartItem[];
    totalAmount: number;
  }
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'https://localhost:44333/api/cart';

  constructor(private http: HttpClient) {}

  // Load Cart Items
  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.baseUrl}/cart-details`);
  }

  // Add Product to Cart
  addToCart(productId: number, quantity: number): Observable<any> {
    const payload = { productId, quantity };
    return this.http.post(`${this.baseUrl}/buy`, payload);
  }

  // Remove Product from Cart
  removeFromCart(productId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/remove/${productId}`, { productId });
  }

  // Increase Quantity
  increaseQuantity(productId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/increase-quantity/${productId}`, { productId });
  }

  // Decrease Quantity
  decreaseQuantity(productId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/decrease-quantity/${productId}`, { productId });
  }

  // Apply Voucher
  applyVoucher(code: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/apply-voucher`, { code }); // Gửi mã trong body
  }

  // Checkout
  checkoutWithBalance(): Observable<any> {
    return this.http.post(`${this.baseUrl}/checkout`, null);
  }
}
