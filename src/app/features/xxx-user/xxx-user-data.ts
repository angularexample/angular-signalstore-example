import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { XxxUserApiResponse } from './xxx-user-types';

@Injectable({
  providedIn: 'root'
})
export class XxxUserData {
  private http: HttpClient = inject(HttpClient);

  getUsers(): Observable<XxxUserApiResponse> {
    // delay added to see the loading component
    const url = 'https://dummyjson.com/users/?delay=1000'
    return this.http.get<XxxUserApiResponse>(url);
  }
}
