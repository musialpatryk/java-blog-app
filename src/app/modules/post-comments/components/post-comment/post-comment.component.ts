import { Component, Input } from '@angular/core';
import { IPostComment } from '../../post-comments.interface';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '../../../translations/pipes/translate.pipe';
import { PostCommentsService } from '../../services/post-comments.service';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  imports: [
    NgIf,
    TranslatePipe,
  ],
})
export class PostCommentComponent {
  @Input() postComment!: IPostComment;

  constructor(
    private postCommentsService: PostCommentsService,
  ) {
  }

  delete() {
    this.postCommentsService.delete(this.postComment.id)
      .subscribe(() => {
        this.postCommentsService.reload();
      });
  }
}
