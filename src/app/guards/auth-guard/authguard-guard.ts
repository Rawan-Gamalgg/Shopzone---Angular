import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
const router = inject(Router);
 const user = localStorage.getItem("currentUser");
        if (!user) {
            // no user logged in so redirect to login page with the return url
            router.navigate(['/login']);
            return false;
        }

        return true;
    };
