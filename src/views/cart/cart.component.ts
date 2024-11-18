import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interfaces/cart.model';
import { CurrencySuffixPipe } from "../../services/pipes/currency-suffix.pipe";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencySuffixPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalPayable: number = 0;
  balance: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCartItems();
  }

  // Load cart items from backend
  loadCartItems() {
    this.cartService.getCart().subscribe(
      (response) => {
        this.cartItems = response.items; // Gán mảng items từ API vào cartItems
        this.totalPrice = response.totalAmount; // Cập nhật tổng tiền từ API
        console.log('Loaded cart items từ loadCartItems:', this.cartItems);
      },
      (error) => {
        console.error('Error loading cart items:', error);
      }
    );
  }

  // Add product to cart
  addToCart(productId: number, quantity: number) {
    this.cartService.addToCart(productId, quantity).subscribe(() => {
      this.loadCartItems(); // Reload cart after adding item
    });
  }

  // Calculate totals
  calculateTotals() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.totalPayable = this.totalPrice; // Adjust for discounts if needed
  }

  // Increase quantity
  increaseQuantity(item: CartItem) {
    this.cartService.increaseQuantity(item.productId).subscribe(() => {
      item.quantity++;
      this.calculateTotals();
    });
  }

  // Decrease quantity
  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.decreaseQuantity(item.productId).subscribe(() => {
        item.quantity--;
        this.calculateTotals();
      });
    }
  }

  // Remove item
  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.productId).subscribe(() => {
      this.cartItems = this.cartItems.filter((cartItem) => cartItem.productId !== item.productId);
      this.calculateTotals();
    });
  }
}
