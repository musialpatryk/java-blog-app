import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RateRepository {
  private readonly RATES_PATH = 'rates';

  constructor(private http: HttpClient) {
  }
  update(postId: number, rate: number): Observable<void> {
    return this.http.put<void>(
      this.RATES_PATH,
      {
        postId,
        score: rate,
      },
    );
  }
}
