import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public isAuthenticated(): Observable<any> {
    return this.http.get('/api/auth/isAuthenticated');
  }

  public getCurrentUser(): Observable<any> {
    return this.http.get('/api/users/getCurrentUserDetail');
  }

  public getCalendar(): Observable<any> {
    return this.http.get('/api/calendar');
  }

  public getUsers(): Observable<any> {
    return this.http.get('/api/users/getAllUsers');
  }
}
