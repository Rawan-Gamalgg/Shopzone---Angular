import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICartItem } from '../../models/cart-item';
import { CartService } from '../../services/cartservice';
import { OrderService } from '../../services/orderservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cartItems: ICartItem[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private orderService:OrderService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    }
    const userIdNum = +userId;
    this.cartService.getCartItems(userIdNum).subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotal();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading cart', err)
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  onQuantityInputChange(item: ICartItem, event: any) {
    let newQuantity = +event.target.value;
    if (isNaN(newQuantity) || newQuantity < 1) {
      newQuantity = 1;
    }
    this.updateQuantity(item, newQuantity);
  }
  updateQuantity(item: ICartItem, newQuantity: number) {
    if (newQuantity < 1) return;
    item.quantity = newQuantity;
    this.cartService.updateItemQuantity(item.id, newQuantity).subscribe({
      next: () => {
        this.calculateTotal();
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  //import Swal from 'sweetalert2';

removeItem(item: ICartItem) {
  Swal.fire({
    title: 'Remove item?',
    text: `Are you sure you want to remove ${item.name}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Yes, remove it'
  }).then((result) => {
    if (result.isConfirmed) {
      this.cartService.removeItem(item.id).subscribe({
        next: () => {
          this.cartItems = this.cartItems.filter(i => i.id !== item.id);
          this.calculateTotal();
          Swal.fire('Removed!', 'Item removed from cart', 'success');
        },
        error: () => Swal.fire('Error!', 'Failed to remove item', 'error')
      });
    }
  });
}
  checkout() {
    if(this.cartItems.length > 0){
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.router.navigate(['/login']);
      return;
    } Swal.fire({
      title: 'Order Confirmation?',
      text: `Are you sure you want to confirm your order?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, confirm'
    }).then((result) => {
      if (result.isConfirmed) {
    this.orderService.placeOrder(+userId, this.cartItems, this.totalPrice ).subscribe({
      next: () => {
        this.cartService.clearUserCart(+userId);
        this.router.navigate(['/orders']);
        Swal.fire('Congrats', 'you placed your first order', 'success');
      },
      error: () => Swal.fire('Error!', 'Failed to confirm order', 'error')
    });
      }
    });
   
  }
}


}