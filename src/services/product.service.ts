import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.model';
import { PagedResponse } from '../interfaces/page.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:44333/products';

  constructor(private http: HttpClient) {}

  getProducts(pageIndex: number, pageSize: number, keyword?: string, minPrice?: number, maxPrice?: number
  ): Observable<PagedResponse<Product>> {
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());
  
    if (keyword) {
      params = params.set('keyword', keyword);
    }
    if (minPrice !== null && minPrice !== undefined) {
      params = params.set('minPrice', minPrice.toString());
    }
    if (maxPrice !== null && maxPrice !== undefined) {
      params = params.set('maxPrice', maxPrice.toString());
    }
  
    return this.http.get<PagedResponse<Product>>(this.apiUrl, { params });
  }

  getProductById(id: number): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers });
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, product);
  }
  
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
