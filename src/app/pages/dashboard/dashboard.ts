import { Component } from '@angular/core';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  get currentUser(): IUser | null {//this is a getter
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
}