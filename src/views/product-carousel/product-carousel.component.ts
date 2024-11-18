import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencySuffixPipe } from "../../app/pipes/currency-suffix.pipe";

@Component({
  selector: 'app-product-carousel',
  standalone: true,
  imports: [
    CommonModule,
    CurrencySuffixPipe
],
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent implements OnInit, OnDestroy {
  products = [
    { name: 'Steam Wallet Code 40 HKD (~127.560 VNĐ)', price: 136000, image: 'https://framerusercontent.com/images/3uswPaVmX9QZ4nyMouQMcMbZpI0.jpg?scale-down-to=512' },
    { name: 'Steam Wallet Code 50 HKD (~159.450 VNĐ)', price: 172000, image: 'https://framerusercontent.com/images/wm1TLaHSlkM125DqcjkcX6C0ks.jpg?scale-down-to=512' },
    { name: 'Steam Wallet Code 80 HKD (~255.120 VNĐ)', price: 272000, image: 'https://framerusercontent.com/images/ooaTyhLy7Z2cEr8L2ZWSiTImqU.jpg?scale-down-to=512' },
    { name: 'Steam Wallet Code 100 HKD (~318.900 VNĐ)', price: 341000, image: 'https://framerusercontent.com/images/51mwE0rHvzVeeaoHjJ2CTU9fjE0.jpg?scale-down-to=512' },
    { name: 'Steam Wallet Code 120 HKD (~382.680 VNĐ)', price: 409000, image: 'https://framerusercontent.com/images/HqZ6AyppHclxBzi5PbPNjSE940.jpg?scale-down-to=512' },
    { name: 'Steam Wallet Code 160 HKD (~510.240 VNĐ)', price: 545000, image: 'https://framerusercontent.com/images/6YiysLj1cYT7DQOBp4mRCv1I05o.jpg?scale-down-to=512' },
    { name: 'Steam Wallet Code 200 HKD (~637.800 VNĐ)', price: 672000, image: 'https://framerusercontent.com/images/odZXp6J9k9Kt7TWXtrd7l1gr8h8.jpg?scale-down-to=512' },
    { name: 'Steam Wallet Code 240 HKD (~765.360 VNĐ)', price: 807000, image: 'https://framerusercontent.com/images/3rzJxlJHN0D5RbbezTYZ4ElIY.jpg?scale-down-to=512' },
    { name: 'Steam Wallet Code 300 HKD (~956.700 VNĐ)', price: 999000, image: 'https://framerusercontent.com/images/2NFWaftsNmGNBp3d0Ulg1PaIBI.jpg?scale-down-to=512' },
    { name: 'Steam Wallet Code 400 HKD (~1.275.600 VNĐ)', price: 1334000, image: 'https://framerusercontent.com/images/v2j42iHAo6mUDVHMThFGEgMB10.jpg?scale-down-to=512' },
    // Thêm các sản phẩm khác nếu cần
  ];

  currentSlide = 0;
  autoSlideInterval: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  prevSlide(): void {
    this.currentSlide = Math.max(this.currentSlide - 1, 0);
    this.updateCarouselPosition();
  }

  nextSlide(): void {
    const maxSlide = this.products.length - 1;
    this.currentSlide = Math.min(this.currentSlide + 1, maxSlide);
    this.updateCarouselPosition();
  }

  updateCarouselPosition(): void {
    const track = document.querySelector('.carousel-track') as HTMLElement;
    const slideWidth = 250 + 30;
    track.style.transform = `translateX(-${this.currentSlide * slideWidth}px)`;
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.products.length;
      this.updateCarouselPosition();
    }, 3000); // 3 giây chuyển slide một lần
  }

  stopAutoSlide(): void {
    clearInterval(this.autoSlideInterval);
  }
}
