import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastMessage>({
    title: '',
    message: '',
    type: 'success',
    show: false
  });

  toast$ = this.toastSubject.asObservable();

  showSuccess(title: string, message: string) {
    this.showToast(title, message, 'success');
  }

  showError(title: string, message: string) {
    this.showToast(title, message, 'error');
  }

  showInfo(title: string, message: string) {
    this.showToast(title, message, 'info');
  }

  showWarning(title: string, message: string) {
    this.showToast(title, message, 'warning');
  }

  private showToast(title: string, message: string, type: 'success' | 'error' | 'info' | 'warning') {
    this.toastSubject.next({
      title,
      message,
      type,
      show: true
    });

    setTimeout(() => {
      this.hideToast();
    }, 3000);
  }

  hideToast() {
    this.toastSubject.next({
      ...this.toastSubject.value,
      show: false
    });
  }
}