import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../modules/posts/services/post.service';
import { IPost } from '../../modules/posts/posts.interface';
import { Observable } from 'rxjs';
import { PostComponent } from '../../modules/posts/components/post/post.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { IPostComment } from '../../modules/post-comments/post-comments.interface';
import { PostCommentsService } from '../../modules/post-comments/services/post-comments.service';
import { PostCommentListComponent } from '../../modules/post-comments/components/post-list/post-comment-list.component';

@Component({
  selector: 'app-post-detail',
  imports: [
    PostComponent,
    AsyncPipe,
    NgIf,
    PostCommentListComponent,
  ],
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit {
  @Input() postId!: number;
  post$!: Observable<IPost>;
  postComments$!: Observable<IPostComment[]>;

  constructor(
    private postService: PostService,
    private postCommentsService: PostCommentsService,
  ) {
  }

  ngOnInit(): void {
    this.post$ = this.postService.getPost(this.postId);
    this.postComments$ = this.postCommentsService.getPostComments(this.postId);
  }
}
