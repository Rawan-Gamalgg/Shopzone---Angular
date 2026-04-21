import { ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../models/user';
import { AuthService } from '../../services/authservice';

@Component({
  selector: 'app-drop-down-menu',
  standalone: false,
  templateUrl: './drop-down-menu.html',
  styleUrl: './drop-down-menu.css',
})
export class DropDownMenu implements OnInit {
  
   currentUser: IUser | null = null; 
  //isDropdownOpen = false;           

  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }   
     this.cdr.detectChanges();

  }

 

  // logout
  logout() {
   this.authService.logout();      
  }
}