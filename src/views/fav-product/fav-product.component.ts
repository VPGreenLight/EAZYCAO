import { Component, OnInit } from '@angular/core';
import { FavProductService } from '../../services/fav-product.service';
import { CartService } from '../../services/cart.service';
import { FavProduct } from '../../interfaces/fav-product.model';
import { CommonModule } from '@angular/common';
import { CurrencySuffixPipe } from "../../app/pipes/currency-suffix.pipe";

@Component({
  selector: 'app-fav-product',
  standalone: true,
  imports: [CommonModule, CurrencySuffixPipe],
  templateUrl: './fav-product.component.html',
  styleUrls: ['./fav-product.component.scss'],
})
export class FavProductComponent implements OnInit {
  favProducts: FavProduct[] = []; // Danh sách sản phẩm yêu thích
  loading: boolean = true; // Hiển thị trạng thái loading
  errorMessage: string = ''; // Thông báo lỗi nếu xảy ra

  constructor(
    private favProductService: FavProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadFavoriteProducts();
  }

  // Load danh sách sản phẩm yêu thích từ API
  loadFavoriteProducts() {
    this.favProductService.getFavoriteProducts().subscribe(
      (response: FavProduct[]) => {
        this.favProducts = response;
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Không thể tải danh sách yêu thích.';
        this.loading = false;
        console.error(error);
      },
    );
  }

  // Thêm sản phẩm vào giỏ hàng
  addToCart(productId: number) {
    console.log('product ID là: ', productId);
    this.cartService.addToCart(productId, 1).subscribe({
      next: () => {
        alert('Đã thêm vào giỏ hàng!');
      },
      error: (error) => {
        console.error('Thêm sản phẩm vào giỏ hàng thất bại:', error);
        alert('Không thể thêm sản phẩm vào giỏ hàng.');
      },
    });
  }

  // Xóa sản phẩm khỏi danh sách yêu thích
  removeFromFavorite(productId: number) {
    this.favProductService.removeFavorite(productId).subscribe({
      next: () => {
        this.favProducts = this.favProducts.filter((product) => product.productID !== productId);
        alert('Đã xoá khỏi danh sách yêu thích!');
      },
      error: (error) => console.error('Xóa sản phẩm khỏi danh sách yêu thích thất bại:', error),
    });
  }
}
