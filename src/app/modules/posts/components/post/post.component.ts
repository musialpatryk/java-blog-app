import { Component, Input } from '@angular/core';
import { IRawPost } from '../../posts.interface';
import { ShortPipe } from '../../../../pipes/short.pipe';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  imports: [
    ShortPipe,
    NgIf,
    RouterLink,
    RouterLinkActive,
  ],
})
export class PostComponent {
  @Input() post!: IRawPost;
  @Input() short = true;
  @Input() removeLinkToDetails = false;
}
