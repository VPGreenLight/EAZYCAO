import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import { Product } from '../../interfaces/product.model';
import { PagedResponse } from '../../interfaces/page.model';
import { CurrencySuffixPipe } from "../../app/pipes/currency-suffix.pipe";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CurrencySuffixPipe
],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  totalItems = 0;
  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts(this.currentPage, this.itemsPerPage).subscribe(
      (response: PagedResponse<Product>) => {
        this.products = response.data;
        this.totalItems = response.totalCount;
        this.totalPages = response.totalPage;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }  

  // Trả về danh sách số trang
  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  // Chuyển sang trang khác
  onPageChange(page: number): void {
    this.currentPage = page;
    console.log(`Moved to page ${page}`);
  }

  // Chuyển trang trước
  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  // Chuyển trang sau
  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }
}
