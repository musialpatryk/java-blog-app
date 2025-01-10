import { Injectable } from '@angular/core';
import { PostRepository } from '../repositories/post-repository.service';
import { concatMap, map, Observable, startWith, Subject } from 'rxjs';
import { IEditPost, IPost, IRawPost } from '../posts.interface';
import { UserService } from '../../users/services/user.service';
import { IUser } from '../../users/users.interface';
import { RateRepository } from '../repositories/rate-repository.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private reloadSubject = new Subject<void>();

  constructor(
    private postRepository: PostRepository,
    private rateRepository: RateRepository,
    private userService: UserService,
  ) {
  }

  reload(): void {
    this.reloadSubject.next();
  }

  getPost(postId: number): Observable<IPost> {
    const currentUser = this.userService.getCurrentUser();

    return this.reloadSubject.asObservable()
      .pipe(
        startWith(undefined),
        concatMap(() => this.resolvePost(postId, currentUser)),
      )
  }

  private resolvePost(
    postId: number,
    currentUser: IUser | null,
  ): Observable<IPost> {
    return this.postRepository.getPost(postId)
      .pipe(
        map((rawPost) => this.convertRawPost(rawPost, currentUser)),
      );
  }

  getPosts(onlyCurrentUser = false): Observable<IPost[]> {
    const currentUser = this.userService.getCurrentUser();

    return (
      onlyCurrentUser && currentUser
        ? this.postRepository.getCurrentUserPosts(currentUser)
        : this.postRepository.getPosts()
    )
      .pipe(
        map((rawPosts) => rawPosts.map(
          (rawPost) => this.convertRawPost(rawPost, currentUser)),
        ),
      );
  }

  private convertRawPost(rawPost: IRawPost, currentUser: IUser | null): IPost {
    return {
      ...rawPost,
      isEditable: currentUser?.id === rawPost.author.id,
    };
  }

  save(post: IEditPost): Observable<IPost> {
    const currentUser = this.userService.getCurrentUser();

    if (!currentUser) {
      throw new Error('Cannot add post when user is not logged in!');
    }

    return this.postRepository.save(post)
      .pipe(
        map((rawPost) => this.convertRawPost(rawPost, currentUser)),
      );
  }

  delete(postId: number): Observable<void> {
    const currentUser = this.userService.getCurrentUser();

    if (!currentUser) {
      throw new Error('Cannot add post when user is not logged in!');
    }

    return this.postRepository.delete(postId);
  }

  updateRating(post: IPost, rate: number): Observable<void> {
    return this.rateRepository.update(post.id, rate);
  }
}
