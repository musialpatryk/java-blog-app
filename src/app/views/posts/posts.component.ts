import { Component, inject, Input, OnInit } from '@angular/core';
import { PostListComponent } from '../../modules/posts/components/post-list/post-list.component';
import { PostService } from '../../modules/posts/services/post.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { IPost } from '../../modules/posts/posts.interface';

@Component({
  selector: 'app-posts',
  imports: [
    PostListComponent,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './posts.component.html',
})
export class PostsComponent implements OnInit {
  @Input() onlyCurrentUser = false;

  postService = inject(PostService);
  posts$!: Observable<IPost[]>;

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts(this.onlyCurrentUser);
  }
}
