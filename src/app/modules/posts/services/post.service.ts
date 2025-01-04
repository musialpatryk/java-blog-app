import { Injectable } from '@angular/core';
import { PostRepository } from '../repositories/post-repository.service';
import { map, Observable } from 'rxjs';
import { IPost, IRawPost } from '../posts.interface';
import { UserService } from '../../users/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private userService: UserService,
  ) {
  }

  getPosts(onlyCurrentUser = false): Observable<IPost[]> {
    return (onlyCurrentUser ? this.postRepository.getCurrentUserPosts() : this.postRepository.getPosts())
      .pipe(
        map((rawPosts) => this.convertRawPosts(rawPosts)),
      );
  }

  private convertRawPosts(rawPosts: IRawPost[]): IPost[] {
    const currentUser = this.userService.getCurrentUser();

    return rawPosts.map((rawPost) => {
      return {
        ...rawPost,
        isEditable: currentUser?.id === rawPost.author.id,
      };
    });
  }
}
