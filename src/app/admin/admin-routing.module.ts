import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ContentManagementComponent } from './components/content-management/content-management.component';
import { PromotionsManagementComponent } from './components/promotions-management/promotions-management.component';
import { CustomerSupportComponent } from './components/customer-support/customer-support.component';
import { FooterManagementComponent } from './components/footer-management/footer-management.component';
import { AdvertisingManagementComponent } from './components/advertising-management/advertising-management.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { AuthGuard } from '../../services/auth.guard';
import { RoleGuard } from '../../services/role.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user-management', component: UserManagementComponent },
      { path: 'order-history', component: OrderHistoryComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'content-management', component: ContentManagementComponent },
      { path: 'promotions-management', component: PromotionsManagementComponent },
      { path: 'customer-support', component: CustomerSupportComponent },
      { path: 'footer-management', component: FooterManagementComponent },
      { path: 'advertising-management', component: AdvertisingManagementComponent },
      { path: 'product-management', component: ProductManagementComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
