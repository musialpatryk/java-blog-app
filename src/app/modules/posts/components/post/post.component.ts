import { Component, Input } from '@angular/core';
import { IRawPost } from '../../posts.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent {
  @Input() post!: IRawPost;
}
