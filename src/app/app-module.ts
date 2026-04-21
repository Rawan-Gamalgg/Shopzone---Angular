import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing-module';
import { App } from './app';
import { Navbar } from './components/navbar/navbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Home } from './pages/home/home';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { Register } from './pages/register/register';
import { ProductList } from './pages/product-list/product-list';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Orders } from './pages/orders/orders';
import { Profile } from './pages/profile/profile';
import { Cart } from './pages/cart/cart';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { DropDownMenu } from './components/drop-down-menu/drop-down-menu';
import { NgOptimizedImage } from '@angular/common';
import { Footer } from './components/footer/footer';
import { ShippingInfoForm } from './components/shipping-info-form/shipping-info-form';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { provideRouter } from '@angular/router';
import { Toast } from './components/toast/toast';

@NgModule({
  declarations: [
    App,
    Navbar,
    Home,
    PageNotFound,
    Login,
    Register,
    ProductList,
    ProductDetail,
    Orders,
    Profile,
    Cart,
    Dashboard,
    DropDownMenu,
    Footer,
    ShippingInfoForm,
    Toast,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, NgOptimizedImage],
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([AuthInterceptor]))],
  bootstrap: [App],
})
export class AppModule {}
