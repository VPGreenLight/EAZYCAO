import { CommonModule } from "@angular/common";
import { ApiService } from "../../api/api.service";
import { RouterModule, RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
    selector: 'admin-root',
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
      RouterOutlet,
      HttpClientModule
    ],
    template: `<router-outlet></router-outlet>`,
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    providers: [ApiService]
  })
  export class AdminComponent {
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