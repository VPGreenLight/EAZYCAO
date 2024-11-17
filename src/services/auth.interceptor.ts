import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token'); // Lấy token từ localStorage
  console.log('Interceptor đang hoạt động!');
  console.log('Token trong Interceptor:', token);
  if (token) {
    // Clone request và thêm header Authorization
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Tiếp tục chuỗi xử lý request
  return next(req);
};
// export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
//   // Inject the current `AuthService` and use it to get an authentication token:
//   const authToken = localStorage.getItem('token');
//   console.log('Token trong Interceptor:', authToken);
//   // Clone the request to add the authentication header.
//   if (authToken) {
//     const newReq = req.clone({
//     headers: req.headers.append('Authorization', `Bearer ${authToken}`),
//   });
//   return next(newReq);
// }
//   return next(req);
// }
