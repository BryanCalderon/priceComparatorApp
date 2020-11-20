import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Producto {
  id: number
  sku: string
  name: string
  image: string
  status?: boolean
  url: string
  brand: string
  model: string
  price: number
  normal_price: number
  offer_price: number
  updated_date: any
  store: String
  user: any
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  endpoint = "products/"

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get<any>(environment.domain + this.endpoint);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(environment.domain + this.endpoint + `${id}/`);
  }

  getByUser(userId: number): Observable<any> {
    return this.http.get<any>(environment.domain + this.endpoint + `by_user/${userId}/`);
  }

  searchProducts(filter: String): Observable<any> {
    return this.http.get<any>(environment.domain + this.endpoint + `search/${filter}/`);
  }

  searchAndSaveProducts(idParent: number, filter: String): Observable<any> {
    return this.http.get<any>(environment.domain + this.endpoint + `${idParent}/search_and_save/${filter}/`);
  }

  persist(product: Producto): Observable<any> {
    return this.http.post(environment.domain + this.endpoint, product);
  }
}
