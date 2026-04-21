import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../models/order';
import { ICartItem } from '../models/cart-item';
import { AuthService } from './authservice';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'http://localhost:3000/orders'

  constructor(private http:HttpClient,private authService:AuthService){}

  //for users
getOrdersByUser(userId: number): Observable<IOrder[]> {
  return this.http.get<IOrder[]>(`${this.baseUrl}?userId=${userId}`);
}
placeOrder(userId:number, cartItems:ICartItem[], totalPrice:number){
  const orderItems = cartItems.map(cartItem =>({
    productId:cartItem.productId,
    name:cartItem.name,
    quantity:cartItem.quantity,
    price:cartItem.price
  }))
  //create the order
  const newOrder = {
    userId:userId,
    items:orderItems,
    total:totalPrice,
    orderDate:new Date(),
    status:"processing"
  }
  return this.http.post(`${this.baseUrl}`, newOrder);
}

cancelOrder(orderId: number, currentStatus: string): Observable<IOrder> {
  if (currentStatus !== 'pending' && currentStatus !== 'processing') {
    throw new Error('Cannot cancel order after it has been shipped');
  }
  return this.http.patch<IOrder>(`${this.baseUrl}/${orderId}`, {status:'cancelled'});
}

//for admins only
updateOrderStatus(order: IOrder, status: string): Observable<IOrder> {
  if (!this.authService.isAdmin()) {
    throw new Error('Only admins can update order status!');
  }
  return this.http.patch<IOrder>(`${this.baseUrl}/${order.id}`, { status });
}

}
