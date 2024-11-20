import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule for router-outlet
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  template: `
  <div class="admin-layout">
  <app-side-bar class="sidebar"></app-side-bar>
  <div class="content">
    <router-outlet></router-outlet>
  </div>
  </div>  
  `,
  imports: [CommonModule, RouterModule, SideBarComponent],
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {}
