import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product.model';
import { ProductDetailService } from '../../services/productdetail.service';

@Component({
  selector: 'app-productdetail-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productdetail-manager.component.html',
  styleUrls: ['./productdetail-manager.component.scss']
})
export class ProductdetailManagerComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    image: '',
    expiry: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
    brand: '',
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
    deletedAt: null,
    isDelete: false,
    deletedBy: null,
    details: [] // Khởi tạo mảng trống
  };
  loading = true;

  constructor(private route: ActivatedRoute, private productDetailService: ProductDetailService) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.getProductDetails(+productId);
    }
  }

  getProductDetails(id: number): void {
    this.productDetailService.getProductDetailsByProductId(id).subscribe(
      (product) => {
        console.log('Dữ liệu từ API:', product);
  
        // Nếu product.productDetails không tồn tại hoặc rỗng, khởi tạo là mảng rỗng
        if (!product.productDetails || product.productDetails.length === 0) {
          console.log('Không có chi tiết sản phẩm.');
          this.product.details = [];
        } else {
          this.product.details = product.productDetails;
        }
  
        console.log('Chi tiết trước khi filter:', this.product.details);
  
        // Lọc chi tiết sản phẩm không bị xóa
        this.product.details = this.product.details.filter(detail => !detail.isDelete);
  
        console.log('Chi tiết sau khi filter:', this.product.details);
  
        this.loading = false;
      },
      (error) => {
        console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
        this.loading = false;
      }
    );
  }
  

  deleteDetail(id: number): void {
    const productDetail = this.product.details.find(detail => detail.id === id);
    if (productDetail) {
      productDetail.isDelete = true; // Đánh dấu là xóa
      console.log(`Product detail with ID ${id} marked as deleted.`);

      // Cập nhật lại giao diện ngay lập tức
      this.product.details = [...this.product.details];
    }
  }

  editDetail(id: number): void {
    console.log('Editing product detail with ID:', id);
    // Implement logic for editing product detail here
  }
}
