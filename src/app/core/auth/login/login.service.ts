import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as pako from 'pako';
import { RIO_INVEST_API } from './../../../shared/config/invest.conf';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private readonly CURRENT_USER_STORAGE_KEY = 'currentUser';
  private readonly USER_FOR_DESK_STORAGE_KEY = 'userForDesk';
  
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUser = this.getCurrentUser();
  }

  private decompressData(data: string): any {
    try {
      const binaryString = atob(data);
      const uint8ArrayData = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        uint8ArrayData[i] = binaryString.charCodeAt(i);
      }

      const decompressedData = pako.ungzip(uint8ArrayData);
      return new TextDecoder().decode(decompressedData);
    } catch (e) {
      console.error("Failed to decompress data", e);
      return null;
    }
  }

  private compressData(data: any): string {
    const compressedData = pako.gzip(JSON.stringify(data));
    const binaryString = compressedData.reduce((acc: string, byte: number) => acc + String.fromCharCode(byte), '');
    return btoa(binaryString);
  }

  getCurrentUser(): Observable<any> {
    const storedData = localStorage.getItem(this.CURRENT_USER_STORAGE_KEY);
    const currentUser = storedData ? this.decompressData(storedData) : null;

    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(currentUser));
    return this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(item: any): Observable<any> {
    return this.http.post(`${RIO_INVEST_API}/api/login/`, item).pipe(
      map((res: any) => {
        const response = res.data;
        if (response) {
          this.setLoginValue(response);
        }
        return response;
      })
    );
  }

  setLoginValue(value: any): void {
    const compressedData = this.compressData(value);
    localStorage.setItem(this.CURRENT_USER_STORAGE_KEY, compressedData);
    this.currentUserSubject.next(value);
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_STORAGE_KEY);
    this.currentUserSubject.next(null);
  }
}
