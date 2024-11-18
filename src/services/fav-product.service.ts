import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FavProduct } from '../interfaces/fav-product.model';

@Injectable({
  providedIn: 'root',
})
export class FavProductService {
  private baseUrl = 'https://localhost:44333/favorites';

  constructor(private http: HttpClient) {}

  // Lấy danh sách sản phẩm yêu thích
  getFavoriteProducts(): Observable<FavProduct[]> {
    return this.http.get<FavProduct[]>(`${this.baseUrl}/list`);
  }

  // Thêm sản phẩm vào danh sách yêu thích
  addFavorite(productId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/add/${productId}`, {});
  }

  // Xóa sản phẩm khỏi danh sách yêu thích
  removeFavorite(productId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/remove/${productId}`, {});
  }
}
