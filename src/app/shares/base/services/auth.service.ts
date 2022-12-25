import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GC_AUTH_TOKEN, GC_USER_ID } from '../constants/constants';
// 1
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 2
  private accessToken: string = null;

  // 3
  private _isAuthenticated = new BehaviorSubject(false);

  constructor() {
  }

  // 4
  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  get getUserId(): string {
    return localStorage.getItem(GC_USER_ID);
  }

  get getAccessToken(): string {
    return localStorage.getItem(GC_AUTH_TOKEN);
  }
  // 5
  saveUserData(id?: string, token?: string) {
    console.log(token);
    if(token) {
      localStorage.setItem(GC_AUTH_TOKEN, token);
      this.setAccessToken(token);
    }
    if(id) localStorage.setItem(GC_USER_ID, id);
  }

  // 6
  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
    this._isAuthenticated.next(true);
  }
  // 7
  logout() {
    localStorage.removeItem(GC_USER_ID);
    localStorage.removeItem(GC_AUTH_TOKEN);
    this.accessToken = null;

    this._isAuthenticated.next(false);
  }

  // 8
  autoLogin() {
    // const id = localStorage.getItem(GC_USER_ID);
    const accessToken = localStorage.getItem(GC_AUTH_TOKEN);

    if (accessToken) {
      this.setAccessToken(accessToken);
    }
  }
}
