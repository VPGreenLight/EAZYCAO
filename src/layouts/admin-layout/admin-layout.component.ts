import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule for router-outlet
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  template: `<app-side-bar></app-side-bar>
  <router-outlet></router-outlet>`,
  imports: [CommonModule, RouterModule, SideBarComponent],
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {}
