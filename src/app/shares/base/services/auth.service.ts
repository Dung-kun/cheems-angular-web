import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GC_AUTH_TOKEN, GC_USER_ID, GC_AUTH_REFRESH_TOKEN } from '../constants/constants';
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

  get getRefreshTokenToken(): string {
    return localStorage.getItem(GC_AUTH_REFRESH_TOKEN);
  }
  // 5
  saveUserData(id?: string, token?: string, refreshToken?: string) {

    if(!!token) {
      localStorage.setItem(GC_AUTH_TOKEN, token);
      if(!!refreshToken) localStorage.setItem(GC_AUTH_REFRESH_TOKEN, refreshToken);
      this.setAccessToken(token);
    }
    if(!!id) localStorage.setItem(GC_USER_ID, id);
  }

  // 6
  setAccessToken(accessToken: string, check?: boolean) {
    this.accessToken = accessToken;
    if(!this._isAuthenticated.getValue() || check) this._isAuthenticated.next(true);
  }
  // 7
  logout() {
    localStorage.removeItem(GC_USER_ID);
    localStorage.removeItem(GC_AUTH_TOKEN);
    localStorage.removeItem(GC_AUTH_REFRESH_TOKEN);
    this.accessToken = null;

    this._isAuthenticated.next(false);
  }

  // 8
  autoLogin() {
    // const id = localStorage.getItem(GC_USER_ID);
    const accessToken = localStorage.getItem(GC_AUTH_TOKEN);

    if (accessToken) {
      this.setAccessToken(accessToken, true);
    }
  }
}
