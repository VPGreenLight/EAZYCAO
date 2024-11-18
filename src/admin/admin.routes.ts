import { Routes } from "@angular/router";
import { AuthGuard } from "../services/auth.guard";
import { RoleGuard } from "../services/role.guard";
import { AdminLayoutComponent } from "../layouts/admin-layout/admin-layout.component";
import { CustomerSupportComponent } from "../views/customer-support/customer-support.component";
import { OrderHistoryComponent } from "../views/order-history/order-history.component";
import { ProductManagementComponent } from "../views/product-management/product-management.component";
import { UserManagementComponent } from "../views/user-management/user-management.component";

export const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1] },
    children: [
      { path: '', redirectTo: 'user-management', pathMatch: 'full' },
      { path: 'user-management', component: UserManagementComponent },
      { path: 'order-history', component: OrderHistoryComponent },
      { path: 'customer-support', component: CustomerSupportComponent },
      { path: 'product-management', component: ProductManagementComponent }
    ]
  }
];
