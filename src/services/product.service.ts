import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;  // Adjusted to match the `image` field in your API
  expiry: string;
  quantity: number;
  category: string;
  brand: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  deletedAt: string | null;
  isDelete: boolean;
  deletedBy: string | null;
}

export interface PagedResponse<T> {
  pageIndex: number;
  pageSize: number;
  data: T[];
  totalCount: number;
  totalPage: number;
}

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
}
