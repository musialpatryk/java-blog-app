import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../users/services/user.service';
import { IUser } from '../../../users/users.interface';
import { TranslatePipe } from '../../../translations/pipes/translate.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostCommentsService } from '../../services/post-comments.service';
import { IPost } from '../../../posts/posts.interface';

@Component({
  selector: 'app-post-comment-form',
  templateUrl: './post-comment-form.component.html',
  imports: [
    TranslatePipe,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PostCommentFormComponent implements OnInit {
  @Input() post!: IPost;

  content = '';
  currentUser!: IUser;

  constructor(
    private userService: UserService,
    private postCommentService: PostCommentsService,
  ) {
  }

  ngOnInit(): void {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      throw new Error('User is not logged in!');
    }

    this.currentUser = currentUser;
  }

  save(): void {
    this.postCommentService.save(this.post.id, this.content)
      .subscribe(() => {
        this.postCommentService.reload();
      });
  }
}
