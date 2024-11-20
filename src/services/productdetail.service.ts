import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.model';

@Injectable({
  providedIn: 'root', // Service sẽ được sử dụng toàn cục
})
export class ProductDetailService {
  private baseUrl = 'https://localhost:44333/products'; // URL API của bạn

  constructor(private http: HttpClient) {}

  // Lấy danh sách chi tiết sản phẩm theo ID sản phẩm
  getProductDetailsByProductId(productId: number): Observable<any> {
    return this.http.get<Product>(`${this.baseUrl}/${productId}`);
  }

  // Xóa sản phẩm chi tiết theo ID
  deleteProductDetailById(detailId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/details/${detailId}`);
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
}
}