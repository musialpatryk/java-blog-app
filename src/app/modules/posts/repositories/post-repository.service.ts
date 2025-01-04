import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRawPost } from '../posts.interface';

@Injectable({
  providedIn: 'root',
})
export class PostRepository {
  private readonly POST_PATH = 'posts';

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<IRawPost[]> {
    return this.http.get<IRawPost[]>(
      `${this.POST_PATH}/all`,
    )
  }

  getCurrentUserPosts(): Observable<IRawPost[]> {
    return this.http.get<IRawPost[]>(
      this.POST_PATH,
    )
  }
}
