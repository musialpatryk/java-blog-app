import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { TranslatePipe } from '../../../translations/pipes/translate.pipe';
import { IPostComment } from '../../post-comments.interface';
import { PostCommentComponent } from '../post-comment/post-comment.component';

@Component({
  selector: 'app-post-comment-list',
  imports: [
    NgForOf,
    NgIf,
    TranslatePipe,
    PostCommentComponent,
  ],
  templateUrl: './post-comment-list.component.html',
})
export class PostCommentListComponent {
  @Input() postComments: IPostComment[] = [];
}
