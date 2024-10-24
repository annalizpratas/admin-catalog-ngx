import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setStorage(storageName: string, value: string): void {
    sessionStorage.setItem(storageName, value);
  }

  getStorage(storageName: string): string {
    return sessionStorage.getItem(storageName);
  }

  clearDataLogin(): void {
    sessionStorage.clear();
  }
}
