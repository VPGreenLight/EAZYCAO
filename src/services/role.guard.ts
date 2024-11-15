import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as Array<string>;
    const userRole = this.authService.getRoles() ?? ''; // Use empty string as default if userRole is null
  
    if (requiredRoles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']); // Redirect if user does not have required role
      return false;
    }
  }  
}
