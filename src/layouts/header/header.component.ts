import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../api/api.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
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

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
        this.loadUserData();
    }
  }

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  loadUserData(): void {
    this.apiService.getUserProfile().subscribe({
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
