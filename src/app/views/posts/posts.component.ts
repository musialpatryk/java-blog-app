import { Component, inject } from '@angular/core';
import { PostListComponent } from '../../modules/posts/components/post-list/post-list.component';
import { PostService } from '../../modules/posts/services/post.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-posts',
  imports: [
    PostListComponent,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './posts.component.html',
})
export class PostsComponent {
  posts$ = inject(PostService).getPosts();
}
