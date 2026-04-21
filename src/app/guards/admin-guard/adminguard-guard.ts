import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
    const user = localStorage.getItem("currentUser");
          if (user) {
              // authorised so return true
              if(JSON.parse(user).role !== "admin"){
                router.navigate(['/home']);
                return false;
              }
            
          }
  return true;
};
