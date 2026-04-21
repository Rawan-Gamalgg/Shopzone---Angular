import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/products'

  constructor(private http:HttpClient){}

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl);
  }
  getById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/${id}`);
  }

  getByCategory(category:string):Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}?category=${category}`);
  }

  //only admin can make add, update, delete
  Add(product:IProduct){

  }
  update(id:Number, product:IProduct){

  }
  delete(id:Number){

  }



}
