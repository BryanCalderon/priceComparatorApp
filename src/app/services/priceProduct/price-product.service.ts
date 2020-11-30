import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PriceProductService {

  endpoint = "precios/"

  constructor(private http: HttpClient) { }

  getByProduct(id: Number): Observable<any> {
    return this.http.get<any>(environment.domain + this.endpoint + `by_parent/${id}/`);
  }
}
