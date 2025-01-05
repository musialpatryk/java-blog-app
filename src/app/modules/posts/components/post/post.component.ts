import { Component, Input } from '@angular/core';
import { IRawPost } from '../../posts.interface';
import { ShortPipe } from '../../../../pipes/short.pipe';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  imports: [
    ShortPipe,
  ],
})
export class PostComponent {
  @Input() post!: IRawPost;
  @Input() shortenedContent = true;
}
