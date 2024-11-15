import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../views/user/user.component';
import { SettingComponent } from '../views/setting/setting.component';
import { CartComponent } from '../views/cart/cart.component';
import { ProductComponent } from '../views/product/product.component';
import { LoginComponent } from '../views/login/login.component';
import { RegisterComponent } from '../views/register/register.component';
import { AuthGuard } from '../services/auth.guard';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';

// export const routes: Routes = [
//   { path: '', redirectTo: '/products', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'products', component: ProductComponent },
//   { path: 'cart', component: CartComponent },
//   { path: 'settings', component: SettingComponent, canActivate: [AuthGuard] },
//   { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
//   { path: '**', redirectTo: '' } 
// ];

export const routes: Routes = [
  {
    path: '', // Trang chính
    component: MainLayoutComponent,
    children: [
      { path: 'products', component: ProductComponent },
      { path: 'cart', component: CartComponent },
      { path: 'settings', component: SettingComponent, canActivate: [AuthGuard] },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'products', pathMatch: 'full' },
    ]
  },
  {
    path: '', // Đường dẫn bố cục cho login và register
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  { path: '**', redirectTo: 'products' } // Redirect đến trang chính nếu route không khớp
];