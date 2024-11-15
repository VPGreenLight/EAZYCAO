import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Đường dẫn đến file định nghĩa các routes của bạn
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),               // Cung cấp HttpClient cho ứng dụng
    provideRouter(routes),             // Cung cấp cấu hình Router cho ứng dụng
    importProvidersFrom()              // Import các providers bổ sung nếu cần thiết
  ]
}).catch(err => console.error(err));

