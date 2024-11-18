import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product.model';
import { CartService } from '../../services/cart.service';
import { CurrencySuffixPipe } from "../../app/pipes/currency-suffix.pipe";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CurrencySuffixPipe
],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  relatedProducts: Product[] = []; 
  quantity: number = 1;            
  selectedTab: string = 'details';

  constructor(
    private route: ActivatedRoute,
    private prodService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      const numericProductId = Number(productId);
      this.getProductDetails(numericProductId);
      this.getRelatedProducts();
    }
  }

  getProductDetails(id: number | null): void {
    if (id) {
      this.prodService.getProductById(id).subscribe(
        (response) => {
          this.product = response;
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
    }
  }

  getRelatedProducts(): void {
    // Logic để lấy danh sách sản phẩm liên quan (giả sử là từ ProductService)
    this.prodService.getProducts(1, 4).subscribe((response) => {
      this.relatedProducts = response.data;  // Giả sử dữ liệu trả về là mảng sản phẩm
    });
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  addToCart(productId: number, quantity: number) {
    this.cartService.addToCart(productId, quantity).subscribe(
      () => {
        alert('Thêm vào giỏ hàng thành công!');
      },
      (error) => {
        console.error('Lỗi khi thêm vào giỏ hàng:', error);
        alert('Không thể thêm vào giỏ hàng. Vui lòng thử lại sau.');
      }
    );
  }
}
