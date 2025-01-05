import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost, IRawPost } from '../posts.interface';

@Injectable({
  providedIn: 'root',
})
export class PostRepository {
  private readonly POST_PATH = 'posts';

  constructor(private http: HttpClient) {
  }

  getPost(postId: number): Observable<IPost> {
    return this.http.get<IPost>(
      `${this.POST_PATH}/${postId}`,
    );
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
