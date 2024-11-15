import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product, PagedResponse } from '../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
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
        this.products = response.data.map(product => ({
          ...product,
          price: product.price * 1000 // Tạm thời nhân lên nếu giá trị từ backend nhỏ hơn thực tế
        }));
        this.totalItems = response.totalCount;
        this.totalPages = response.totalPage;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }  

  // Navigate to previous page
  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  // Navigate to next page
  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }
}
