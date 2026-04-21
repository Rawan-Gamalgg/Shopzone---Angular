import { Component } from '@angular/core';
import { ToastMessage, ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: false,
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  toast: ToastMessage = {
    title: '',
    message: '',
    type: 'success',
    show: false
  };

  constructor(private toastService: ToastService) {
    this.toastService.toast$.subscribe(toast => {
      this.toast = toast;
    });
  }

  getIcon(): string {
    switch (this.toast.type) {
      case 'success': return 'fa fa-check-circle';
      case 'error': return 'fa fa-exclamation-circle';
      case 'warning': return 'fa fa-exclamation-triangle';
      case 'info': return 'fa fa-info-circle';
      default: return 'fa fa-check-circle';
    }
  }

  getHeaderClass(): string {
    switch (this.toast.type) {
      case 'success': return 'bg-success text-white';
      case 'error': return 'bg-danger text-white';
      case 'warning': return 'bg-warning text-dark';
      case 'info': return 'bg-info text-white';
      default: return 'bg-success text-white';
    }
  }

  hide() {
    this.toastService.hideToast();
  }
}