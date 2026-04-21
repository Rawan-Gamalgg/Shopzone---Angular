import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IUser } from '../../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authservice';
import { CartService } from '../../services/cartservice';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
// navbar.ts
export class Navbar {
  isMenuOpen = false;
  isDropdownOpen = false;
  cartCount=0;
  isLoggedIn=false;
  constructor(
    public authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.cdr.detectChanges();  
  }
  get currentUser(): IUser | null {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
 toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
    this.isMenuOpen = !this.isMenuOpen;

  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }


  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}