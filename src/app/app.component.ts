import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../views/login/login.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layouts/header/header.component';
import { NavbarComponent } from '../layouts/navbar/navbar.component';
import { BannerComponent } from '../layouts/banner/banner.component';
import { ProductComponent } from '../views/product/product.component';
import { FooterComponent } from '../layouts/footer/footer.component';
import { ApiService } from '../services/api/api.service';
import { AuthService } from '../services/auth.service';
import { RegisterComponent } from '../views/register/register.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    HttpClientModule,
    SlickCarouselModule
  ],
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  isLoggedIn = false;

  // Xử lý sự kiện đăng nhập từ app-login
  login(isSuccessful: boolean) {
    if (isSuccessful) {
      this.isLoggedIn = true;
    }
  }

  // Thêm chức năng đăng xuất nếu cần
  logout() {
    this.isLoggedIn = false;
  }
}