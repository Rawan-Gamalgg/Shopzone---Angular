import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/orderservice';
import { Router } from '@angular/router';
import { IOrder } from '../../models/order';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  standalone: false,
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit{
  userId!:number
  orders!:IOrder[]
  constructor(private cdr:ChangeDetectorRef,
              private orderService:OrderService,
              private router:Router
    ){}
  ngOnInit(): void {
this.setUserId();
this.loadOrders();

  }

  loadOrders(){

  this.orderService.getOrdersByUser(this.userId).subscribe(orders=>{
    this.orders = orders;
    this.cdr.detectChanges();
  });
  }
  setUserId(){
    this.userId =Number(localStorage.getItem('userId'));
    if (!this.userId) {
      this.router.navigate(['/login']);
      return;
    }
  }

canCancelOrder(status: string): boolean {
  return status === 'pending' || status === 'processing';
}

cancelOrder(order: IOrder) {
  if (!this.canCancelOrder(order.status)) {
    Swal.fire({
      title: 'Cannot Cancel',
      text: `Order status is "${order.status}". Only pending or processing orders can be cancelled.`,
      icon: 'warning'
    });
    return;
  }

  Swal.fire({
    title: 'Cancel Order?',
    text: `Are you sure you want to cancel order #${order.id}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    confirmButtonText: 'Yes, cancel it'
  }).then((result) => {
    if (result.isConfirmed) {
      this.orderService.cancelOrder(order.id, order.status).subscribe({
        next: (updatedOrder) => {
          order.status = updatedOrder.status;
          this.cdr.detectChanges();
          Swal.fire('Cancelled!', `Order #${order.id} has been cancelled.`, 'success');
        },
        error: (err) => {
          Swal.fire('Error!', err.message || 'Failed to cancel order', 'error');
        }
      });
    }
  });
}


}
