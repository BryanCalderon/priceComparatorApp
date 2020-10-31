import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id: number
  sku: string
  name: string
  image: string
  status: boolean
  url: string
  brand: string
  model: string
  price: number
  normal_price: number
  offer_price: number
  creation_date: Date
  update_date: Date
};

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/products/`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/products/${id}/`);
  }

  searchProducts(filter: String): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/app/search/${filter}/`);
  }
}
