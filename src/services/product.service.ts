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

  getProducts(pageIndex: number, pageSize: number): Observable<PagedResponse<Product>> {
    const params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResponse<Product>>(this.apiUrl, { params });
  }

  getProductById(id: number): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers });
  }
}
