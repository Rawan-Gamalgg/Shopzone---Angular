import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const userId = localStorage.getItem('userId');
  
  let clonedRequest = req;
  if (userId) {
    clonedRequest = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${userId}`
      }
    });
  }
  
  return next(clonedRequest).pipe(
    tap((event: any) => {
      const isLoginRequest = req.url.includes('/users?email=') && 
                             req.url.includes('&password=') && 
                             req.method === 'GET';
      
      if (isLoginRequest) {
        if (event.body && Array.isArray(event.body) && event.body.length > 0) {
          const user = event.body[0];
          
          localStorage.setItem('userId', user.id.toString());
          localStorage.setItem('currentUser', JSON.stringify(user));
          
          console.log(' User data saved from interceptor:', user);
        }
      }
    })
  );
};