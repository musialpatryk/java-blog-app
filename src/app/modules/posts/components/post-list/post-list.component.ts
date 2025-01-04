import { Component, Input } from '@angular/core';
import { IPost } from '../../posts.interface';
import { PostComponent } from '../post/post.component';
import { NgForOf, NgIf } from '@angular/common';
import { TranslatePipe } from '../../../translations/pipes/translate.pipe';

@Component({
  selector: 'app-post-list',
  imports: [
    PostComponent,
    NgForOf,
    NgIf,
    TranslatePipe,
  ],
  templateUrl: './post-list.component.html',
})
export class PostListComponent {
  @Input() posts: IPost[] = [];
}
