import { Routes } from '@angular/router';
import { UserComponent } from '../views/user/user.component';
import { CartComponent } from '../views/cart/cart.component';
import { ProductComponent } from '../views/product/product.component';
import { AuthGuard } from '../services/auth.guard';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { ProductDetailComponent } from '../views/product-detail/product-detail.component';
import { UnauthorizedComponent } from '../views/unauthorize/unauthorize.component';
import { RoleGuard } from '../services/role.guard';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { LoginComponent } from '../views/login/login.component';
import { RegisterComponent } from '../views/register/register.component';
import { FavProductComponent } from '../views/fav-product/fav-product.component';
import { adminRoutes } from '../admin/admin.routes';
import { PaymentSuccessfulComponent } from '../views/payment-successful/payment-successful.component';
import { PaymentCallbackComponent } from '../views/payment-callback/payment-callback.component';
import { RechargeComponent } from '../views/recharge/recharge.component';

export const routes: Routes = [
  ...adminRoutes,
  {
    path: '', // Trang chính
    component: MainLayoutComponent,
    children: [
      { path: 'products', component: ProductComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'profile', component: UserComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: [2, 1] }},
      { path: 'favorites', component: FavProductComponent , canActivate: [AuthGuard, RoleGuard], data: { roles: [2, 1] }},
      { path: 'cart', component: CartComponent },
      { path: 'recharge', component: RechargeComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: [2, 1] }},
      { path: 'payment-successful', component: PaymentSuccessfulComponent, canActivate: [AuthGuard]},
      { path: 'payment-callback', component: PaymentCallbackComponent, canActivate: [AuthGuard] },
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
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  { path: '**', redirectTo: 'products' }
];
