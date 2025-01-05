import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../modules/posts/services/post.service';
import { IPost } from '../../modules/posts/posts.interface';
import { Observable } from 'rxjs';
import { PostComponent } from '../../modules/posts/components/post/post.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  imports: [
    PostComponent,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit {
  @Input() postId!: number;
  post$!: Observable<IPost>;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.post$ = this.postService.getPost(this.postId);
  }
}
