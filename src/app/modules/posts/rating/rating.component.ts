import { Component, Input } from '@angular/core';
import { DecimalPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IPost } from '../posts.interface';
import { PostService } from '../services/post.service';
import { RateColorPipe } from '../pipes/rate-color.pipe';

@Component({
  selector: 'app-rating',
  imports: [
    DecimalPipe,
    NgForOf,
    NgIf,
    FormsModule,
    NgClass,
    RateColorPipe,
  ],
  templateUrl: './rating.component.html',
})
export class RatingComponent {
  @Input() post!: IPost;
  @Input() short = false;

  readonly ratings = [ 1, 2, 3, 4, 5 ];

  edit = false;

  constructor(private postService: PostService) {
  }

  save(rate: number | string): void {
    this.postService.updateRating(this.post, Number(rate))
      .subscribe(() => {
        this.edit = false;
        this.postService.reload();
      });
  }
}
