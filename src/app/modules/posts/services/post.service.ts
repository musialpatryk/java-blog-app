import { Injectable } from '@angular/core';
import { PostRepository } from '../repositories/post-repository.service';
import { map, Observable } from 'rxjs';
import { IEditPost, IPost, IRawPost } from '../posts.interface';
import { UserService } from '../../users/services/user.service';
import { IUser } from '../../users/users.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private userService: UserService,
  ) {
  }

  getPost(postId: number): Observable<IPost> {
    const currentUser = this.userService.getCurrentUser();

    return this.postRepository.getPost(postId)
      .pipe(
        map((rawPost) => this.convertRawPost(rawPost, currentUser)),
      )
  }

  getPosts(onlyCurrentUser = false): Observable<IPost[]> {
    const currentUser = this.userService.getCurrentUser();

    return (onlyCurrentUser ? this.postRepository.getCurrentUserPosts() : this.postRepository.getPosts())
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
}
