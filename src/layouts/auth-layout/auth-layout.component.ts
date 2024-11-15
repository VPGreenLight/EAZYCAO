import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  template: `<router-outlet></router-outlet>`,
  imports: [RouterModule],
})
export class AuthLayoutComponent {}