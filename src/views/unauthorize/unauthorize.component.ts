import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  template: `
    <div class="unauthorized">
      <h1>403 - Không có quyền truy cập</h1>
      <p>Bạn không được phép truy cập trang này.</p>
    </div>
  `,
})
export class UnauthorizedComponent {}
