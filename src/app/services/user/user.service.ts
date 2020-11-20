import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface User {
  name: String,
  last_name: String,
  identification: String,
  email: String,
  uid?: String,
  is_active?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint = 'users/';

  constructor(private http: HttpClient) { }

  create(user: User): Observable<any> {
    return this.http.post(environment.domain + this.endpoint, user);
  }

  getByUID(uid: String): Observable<any> {
    return this.http.get(environment.domain + + this.endpoint + `by_uid/${uid}/`);
  }
}
