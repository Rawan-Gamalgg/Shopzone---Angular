import { Component, OnInit } from '@angular/core';
import { IUser } from '../../models/user';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/authservice';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  user: IUser | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.user = this.authService.getUser();
  }

  getInitials(name: string): string {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  getMemberSince(): string {
    const registeredDate = localStorage.getItem('registeredDate');
    if (registeredDate) {
      return new Date(registeredDate).toLocaleDateString();
    }
    return 'January 2025'; 
  }

  logout(){

    this.authService.logout();
  }

 
}
