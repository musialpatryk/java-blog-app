import { Component, Input } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { IRawPost } from '../../posts.interface';
import { TranslatePipe } from '../../../translations/pipes/translate.pipe';

@Component({
  selector: 'app-post',
  imports: [
    JsonPipe,
    TranslatePipe,
  ],
  templateUrl: './post.component.html',
})
export class PostComponent {
  @Input() post!: IRawPost;
}
