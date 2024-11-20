import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../interfaces/product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencySuffixPipe } from "../../services/pipes/currency-suffix.pipe";
import { PagedResponse } from '../../interfaces/page.model';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, CurrencySuffixPipe],
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  totalItems = 0;
  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 0;
  loading: boolean = true;

  searchTerm: string = '';
  editForm: FormGroup;
  isEditMode = false;
  isAddMode = false;
  selectedProduct: Product | null = null;

  categories = [
    { id: 1, name: 'Thẻ Cào' },
    { id: 2, name: 'Giải Trí' }
  ];

  brands = [
    { id: 1, name: 'Viettel' },
    { id: 2, name: 'Mobifone' },
    { id: 3, name: 'Vinaphone' },
    { id: 4, name: 'Netflix' }
  ];

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      brandId: ['', Validators.required],
      quantity: [0, Validators.required],
      price: [0, Validators.required],
      description: [''],
      image: ['', Validators.required],
      expiry: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  // Hàm để lấy tên danh mục từ ID
  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : '';
  }
  
  getBrandName(brandId: number): string {
    const brand = this.brands.find(b => b.id === brandId);
    return brand ? brand.name : '';
  }

  getProducts(): void {
    this.productService.getProducts(this.currentPage, this.itemsPerPage).subscribe(
      (response: PagedResponse<Product>) => {
        this.products = response.data.filter(product => !product.isDelete);
        this.totalItems = response.totalCount;
        this.totalPages = response.totalPage;
        this.loading = false;  // Stop loading when data is loaded
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.loading = false;  // Stop loading in case of error
      }
    );
  }

  onEditProduct(product: Product) {
    this.isEditMode = true;
    this.isAddMode = false; // Disable add mode when editing
    this.selectedProduct = product;
    const formattedExpiry = this.formatDate(product.expiry);
    this.editForm.patchValue({
      name: product.name,
      image: product.image,
      expiry: formattedExpiry,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      categoryId: product.category || '',
      brandId: product.brand || ''
    });
  }

  // Hàm chuyển đổi ngày từ ISO 8601 sang định dạng yyyy-MM-dd
  formatDate(date: string): string {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = ('0' + (newDate.getMonth() + 1)).slice(-2);  // Months start from 0
    const day = ('0' + newDate.getDate()).slice(-2); // Day
    return `${year}-${month}-${day}`;
  }

  saveProduct(): void {
    if (this.isAddMode) {
      this.createProduct();
    } else if (this.isEditMode) {
      this.updateProduct();
    }
  }

  createProduct(): void {
    const newProduct = this.editForm.value;
    this.productService.createProduct(newProduct).subscribe({
      next: () => {
        alert('Thêm sản phẩm thành công!');
        this.getProducts();  // Refresh product list
        this.isAddMode = false;  // Disable add mode
      },
      error: (err) => {
        console.error('Thêm sản phẩm thất bại:', err);
        alert('Thêm sản phẩm thất bại!');
      }
    });
  }

  updateProduct(): void {
    if (this.selectedProduct) {
      const updatedProduct = { ...this.selectedProduct, ...this.editForm.value };
      this.productService.updateProduct(updatedProduct.id, updatedProduct).subscribe({
        next: () => {
          alert('Cập nhật sản phẩm thành công!');
          this.getProducts();  // Refresh product list
          this.isEditMode = false;  // Disable edit mode
          this.selectedProduct = null;  // Reset selected product
        },
        error: (err) => {
          console.error('Cập nhật sản phẩm thất bại:', err);
          alert('Cập nhật sản phẩm thất bại!');
        }
      });
    }
  }

  cancelAdd() {
    this.isAddMode = false;
    this.editForm.reset(); // Reset form to avoid old data lingering
  }

  cancelEdit() {
    this.isEditMode = false;
    this.editForm.reset(); // Reset form when cancelling edit mode
  }

  deleteProduct(productId: number): void {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        alert('Xóa sản phẩm thành công!');
        this.getProducts();  // Refresh product list after deletion
      });
    }
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getProducts();  // Refresh products on page change
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getProducts();  // Fetch products for the previous page
    }
  }

  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getProducts();  // Fetch products for the next page
    }
  }

  onAddProduct(): void {
    this.isAddMode = true;
    this.isEditMode = false;
    this.selectedProduct = null;
    this.editForm.reset(); // Reset form to avoid old data lingering
  }
}
