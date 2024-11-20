import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule, 
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isDropdownVisible: boolean = false;
  userName: string = '';
  userMoney: number = 0;
  userAvatar: string = '';
  defaultAvatar: string = '../../assets/userAva.png'; // Default avatar
  keyword = '';

  constructor(
    private userService: UserService, 
    private authService: AuthService, 
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
        this.loadUserData();
    }
  }

  onSearch(): void {
    this.searchService.updateKeyword(this.keyword); // Phát sự kiện khi tìm kiếm
  }

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  loadUserData(): void {
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        this.userName = user.name || user.userName;
        this.userMoney = user.money;
      },
      error: (err) => {
        console.error('Failed to load user data:', err);
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
