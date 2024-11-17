import { Routes } from '@angular/router';
import { UserComponent } from '../views/user/user.component';
import { SettingComponent } from '../views/setting/setting.component';
import { CartComponent } from '../views/cart/cart.component';
import { ProductComponent } from '../views/product/product.component';
import { AuthGuard } from '../services/auth.guard';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { ProductDetailComponent } from '../views/product-detail/product-detail.component';
import { UnauthorizedComponent } from '../views/unauthorize/unauthorize.component';
import { RoleGuard } from '../services/role.guard';
import { UserManagementComponent } from './admin/components/user-management/user-management.component';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { LoginComponent } from '../views/login/login.component';
import { RegisterComponent } from '../views/register/register.component';

export const routes: Routes = [
  {
    path: '', // Trang chính
    component: MainLayoutComponent,
    children: [
      { path: 'products', component: ProductComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'cart', component: CartComponent },
      { path: '', redirectTo: 'products', pathMatch: 'full' },
    ]
  },
  {
    path: 'admin',
    //component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] },
    children: [
      { path: 'user-management', component: UserManagementComponent }
    ]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['user', 'admin'] },
    children: [
      { path: 'support', component: SettingComponent },
      { path: 'user', component: UserComponent }
      // { path: 'orders', component: OrdersComponent },
      // { path: 'fav', component: FavProductComponent },
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
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  { path: '**', redirectTo: 'products' }
];

// export const routes: Routes = [
//   {
//     path: '', // Trang chính
//     component: MainLayoutComponent,
//     children: [
//       { path: 'products', component: ProductComponent },
//       { path: 'products/:id', component: ProductDetailComponent },
//       { path: 'cart', component: CartComponent },
//       { path: 'support', component: SettingComponent, canActivate: [AuthGuard] },
//       { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
//       //{ path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
//       //{ path: 'fav', component: FavProductComponent, canActivate: [AuthGuard] },
//       { path: '', redirectTo: 'products', pathMatch: 'full' },
//     ]
//   },
//   {
//     path: '', // Đường dẫn bố cục cho login và register
//     component: AuthLayoutComponent,
//     children: [
//       { path: 'login', component: LoginComponent },
//       { path: 'register', component: RegisterComponent },
//     ],
//   },
//   { path: '**', redirectTo: 'products' } // Redirect đến trang chính nếu route không khớp
// ];