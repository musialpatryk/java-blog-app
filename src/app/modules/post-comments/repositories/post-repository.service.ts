import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEditPostComment, IRawPostComment } from '../post-comments.interface';

@Injectable({
  providedIn: 'root',
})
export class PostCommentRepository {
  private readonly POST_COMMENTS_PATH = 'post-comments';

  constructor(private http: HttpClient) {
  }

  getPostComments(postId: number): Observable<IRawPostComment[]> {
    return this.http.get<IRawPostComment[]>(
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

  save(postComment: IEditPostComment): Observable<IRawPostComment> {
    return this.http.post<IRawPostComment>(
      this.POST_COMMENTS_PATH,
      postComment,
    );
  }
}
