import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/users'
  currentUser:IUser|null=null;

  constructor(private http:HttpClient,private router:Router){}
  //Get All Users----------------------------------------------------------------------
  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseUrl);
  }
  //Get User By Id----------------------------------------------------------------------
  getById(id: number): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}/${id}`);
  }
  //Get User By Email----------------------------------------------------------------------
  getUserByEmail(email: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}?email=${email}`);
  }
  //Register ----------------------------------------------------------------------
register(user: IUser): Observable<IUser> {
  //check if this email already exists in the users array in db
  user = {...user, role: "user"};
  return this.http.post<IUser>(`${this.baseUrl}`, user);
  
}
//Login------------------------------------------------------------------------
login(userData: any): Observable<IUser[]> {
  const url = `${this.baseUrl}?email=${userData.email}&password=${userData.password}`;
  return this.http.get<IUser[]>(url);
}
//Get current User--------------------------------------------------------------
getUser(): IUser | null {
  const userData = localStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) as IUser : null;
}
isLoggedIn(): boolean {
  return !!localStorage.getItem('userId');
}
//Logout------------------------------------------------------------------------
 logout(){
  //delete the user from the localstorage
  localStorage.removeItem("currentUser");
  localStorage.removeItem('userId');
  this.router.navigate(['/login']);

 }

 //Check admin-----------------------------------------------------------------
isAdmin(): boolean {
  const userStr = localStorage.getItem('currentUser');
  if (!userStr) return false;
  const user = JSON.parse(userStr);
  return user?.role === 'admin';
}
}