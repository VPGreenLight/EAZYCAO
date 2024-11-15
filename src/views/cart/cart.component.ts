import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  quantity: number;
  imageUrl: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []; // Array of cart items
  totalPrice: number = 0;
  totalPayable: number = 0;
  balance: number = 0;

  ngOnInit() {
    this.loadCartItems();
    this.calculateTotals();
  }

  loadCartItems() {
    // Load cart items from a service or mock data
    this.cartItems = [
      {
        id: 1,
        name: 'Netflix Premium 1 tháng - Tài khoản',
        category: 'App, Giải trí, Xem phim',
        price: 62000,
        originalPrice: 180000,
        discount: 66,
        quantity: 1,
        imageUrl: 'assets/netflix.jpg'
      }
    ];
  }

  calculateTotals() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.totalPayable = this.totalPrice; // Adjust for discounts or other factors if necessary
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
    this.calculateTotals();
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotals();
    }
  }

  removeItem(item: CartItem) {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
    this.calculateTotals();
  }
}

