// cart.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartItem } from '../models/cart-item';

@Injectable({ providedIn: 'root' })
export class CartService {
  private baseUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  getCartItems(userId: number): Observable<ICartItem[]> {
    return this.http.get<ICartItem[]>(`${this.baseUrl}?userId=${userId}`);
  }

  addToCart(cartItem: Omit<ICartItem, 'id'>): Observable<ICartItem> {
    return this.http.post<ICartItem>(this.baseUrl, cartItem);
  }

  updateItemQuantity(cartItemId: number, newQuantity: number): Observable<ICartItem> {
    return this.http.patch<ICartItem>(`${this.baseUrl}/${cartItemId}`, { quantity: newQuantity });
  }

  removeItem(cartItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${cartItemId}`);
  }

  clearUserCart(userId: number): void {
    this.getCartItems(userId).subscribe({
      next: (items) => {
        for (let item of items) {
          this.removeItem(item.id).subscribe({
            error: (err) => console.error('Error deleting item', err)
          });
        }
        console.log('Cart cleared for user', userId);
      },
      error: (err) => console.error('Error fetching cart', err)
    });
  }
}