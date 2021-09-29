import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommentsService, PostsService } from '@core/services';
import { CommentBase, Post } from '@shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent implements OnInit {
  posts$!: Observable<Post[]>;

  search = '';

  constructor(private _postsService: PostsService, private _commentsService: CommentsService) {}

  ngOnInit(): void {
    this.posts$ = this._postsService.getPosts$();
  }

  onCommentCreate(commentBase: CommentBase): void {
    console.log('newComment:', commentBase);
  }

  trackById = (_: number, post: Post) => post.id;
}
