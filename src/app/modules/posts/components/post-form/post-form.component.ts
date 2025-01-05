import { Component, Input, OnInit } from '@angular/core';
import { TranslatePipe } from '../../../translations/pipes/translate.pipe';
import { Observable, of, tap } from 'rxjs';
import { IEditPost } from '../../posts.interface';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  imports: [
    TranslatePipe,
    FormsModule,
    NgIf,
    AsyncPipe,
  ],
})
export class PostFormComponent implements OnInit {
  @Input() postId?: number;

  post$!: Observable<IEditPost>;
  model!: IEditPost;

  constructor(
    private postService: PostService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    const initialPost$ = this.postId
      ? this.postService.getPost(this.postId)
      : of({ active: true });

    this.post$ = initialPost$
      .pipe(
        tap((post) => this.model = post),
      );
  }

  save(): void {
    this.postService.save(this.model)
      .subscribe((savedPost) => {
        this.router.navigate([ '/app/post-details', savedPost.id ]);
      });
  }
}
