import { Component, Input } from '@angular/core';
import { IPost } from '../../posts.interface';
import { ShortPipe } from '../../../../pipes/short.pipe';
import { NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '../../../translations/pipes/translate.pipe';
import { PostService } from '../../services/post.service';
import { RatingComponent } from '../../rating/rating.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  imports: [
    ShortPipe,
    NgIf,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    RatingComponent,
  ],
})
export class PostComponent {
  @Input() post!: IPost;
  @Input() short = true;
  @Input() removeLinkToDetails = false;

  constructor(
    private postService: PostService,
    private router: Router,
  ) {
  }

  delete() {
    this.postService.delete(this.post.id)
      .subscribe(() => {
        this.router.navigate([ '/app' ]);
      });
  }
}
