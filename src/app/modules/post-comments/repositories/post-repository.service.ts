import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPostComment } from '../post-comments.interface';

@Injectable({
  providedIn: 'root',
})
export class PostCommentRepository {
  private readonly POST_COMMENTS_PATH = 'post-comments';

  constructor(private http: HttpClient) {
  }

  getPostComments(postId: number): Observable<IPostComment[]> {
    return this.http.get<IPostComment[]>(
      `${this.POST_COMMENTS_PATH}`,
      {
        params: {
          postId,
        },
      },
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.POST_COMMENTS_PATH}/${id}`);
  }
}
