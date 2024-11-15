import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { BannerComponent } from "../banner/banner.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterModule } from '@angular/router';
import { ProductCarouselComponent } from "../../views/product-carousel/product-carousel.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  template: `
    <div class="app">
    <div class="layout">
        <app-navbar></app-navbar>
        <div class="content">
        <app-header></app-header>
        <app-banner></app-banner>
        <app-product-carousel></app-product-carousel>
        <!-- Router Outlet for Dynamic Component Loading -->
        <router-outlet></router-outlet>
        </div>
    </div>
    <app-footer></app-footer>
    </div>
  `,
  imports: [HeaderComponent, NavbarComponent, BannerComponent, FooterComponent, RouterModule, ProductCarouselComponent],
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {}
