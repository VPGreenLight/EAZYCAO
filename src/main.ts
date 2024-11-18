import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthInterceptor } from './services/auth.interceptor';
import { CurrencySuffixPipe } from './app/pipes/currency-suffix.pipe'; // Đường dẫn tới pipe

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideRouter(routes),
    CurrencySuffixPipe,
  ],
}).catch((err) => console.error(err));


