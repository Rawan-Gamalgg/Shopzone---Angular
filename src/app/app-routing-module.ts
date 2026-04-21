import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { ProductList } from './pages/product-list/product-list';
import { Login } from './pages/login/login';
import { Cart } from './pages/cart/cart';
import { Profile } from './pages/profile/profile';
import { Orders } from './pages/orders/orders';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { GuestGuard } from './guards/guest-guard/guestguard-guard';
import { AuthGuard } from './guards/auth-guard/authguard-guard';
import { AdminGuard } from './guards/admin-guard/adminguard-guard';
import { ProductDetail } from './pages/product-detail/product-detail';

export const routes: Routes = [
  {path: 'home', component:Home},
  {path: '', component:Home},
  {path:'products', component:ProductList},
  {path:'product/:id', component:ProductDetail},
  {path:'login', component:Login, canActivate: [GuestGuard]},
  {path:'register', component:Register, canActivate: [GuestGuard]},
  {path:'cart', component:Cart, canActivate: [AuthGuard]},
  {path:'profile', component:Profile, canActivate: [AuthGuard]},
  {path:'orders', component:Orders, canActivate: [AuthGuard]},
  {path:'orders/:id', component:Orders, canActivate: [AuthGuard]},
  {path:'dashboard', component:Dashboard,canActivate: [AuthGuard, AdminGuard]},
  {path:'**', component:PageNotFound}//**:wildcard=>  means any path that is not defined in the above routes will be handled by this route, which will display the PageNotFound component. This is a common practice to handle 404 errors in Angular applications. 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
