import { Component, Input } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { IRawPost } from '../../posts.interface';

@Component({
  selector: 'app-post',
  imports: [
    JsonPipe,
  ],
  templateUrl: './post.component.html',
})
export class PostComponent {
  @Input() post!: IRawPost;
}
