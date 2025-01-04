import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private sessionStorage!: Storage;

  constructor(
    @Inject(DOCUMENT) document: Document,
  ) {
    if (!document.defaultView) {
      throw new Error('Unable to locate document');
    }

    this.sessionStorage = document.defaultView!.sessionStorage;
  }

  getItem<T = string>(key: string): T | null {
    const data = this.sessionStorage.getItem(key);
    if (!data) {
      return null;
    }

    return JSON.parse(data);
  }

  setItem(key: string, value: unknown): void {
    this.sessionStorage.setItem(
      key,
      JSON.stringify(value),
    );
  }

  removeItem(key: string): void {
    this.sessionStorage.removeItem(key);
  }
}
