import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const GuestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = localStorage.getItem("currentUser");
        if (user) {
          if(JSON.parse(user).role === "admin"){
            router.navigate(['/dashboard']);
          }
          else if(JSON.parse(user).role === "user"){
            router.navigate(['/home']);
        }            return false;

}  return true;

};
