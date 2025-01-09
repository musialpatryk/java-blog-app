import { Injectable } from '@angular/core';
import { IPostComment, IRawPostComment } from '../post-comments.interface';
import { concatMap, map, Observable, startWith, Subject } from 'rxjs';
import { PostCommentRepository } from '../repositories/post-repository.service';
import { IUser } from '../../users/users.interface';
import { UserService } from '../../users/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class PostCommentsService {
  private reloadSubject = new Subject<void>();

  constructor(
    private postCommentsRepository: PostCommentRepository,
    private userService: UserService,
  ) {
  }

  reload(): void {
    this.reloadSubject.next();
  }

  getPostComments(postId: number): Observable<IPostComment[]> {
    return this.reloadSubject.asObservable()
      .pipe(
        startWith(undefined),
        concatMap(() => this.getPostComments$(postId)),
      );
  }

  private getPostComments$(postId: number): Observable<IPostComment[]> {
    const currentUser = this.userService.getCurrentUser();

    return this.postCommentsRepository.getPostComments(postId)
      .pipe(
        map((rawPostComments) => rawPostComments.map(
          (rawPostComment) => this.convertRawPostComment(rawPostComment, currentUser)),
        ),
      );
  }

  private convertRawPostComment(rawPostComment: IRawPostComment, currentUser: IUser | null): IPostComment {
    return {
      ...rawPostComment,
      isEditable: currentUser?.id === rawPostComment.author.id,
    };
  }

  delete(id: number): Observable<void> {
    return this.postCommentsRepository.delete(id);
  }

  save(postId: number, content: string): Observable<IPostComment> {
    const currentUser = this.userService.getCurrentUser();

    return this.postCommentsRepository.save({ postId, content })
      .pipe(
        map((rawPostComment) => this.convertRawPostComment(rawPostComment, currentUser)),
      );
  }
}
