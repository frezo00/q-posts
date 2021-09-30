import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PostsService } from '@core/services';
import { Post } from '@shared/models';
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

  constructor(private _postsService: PostsService) {}

  ngOnInit(): void {
    this.posts$ = this._postsService.getPosts$();
  }

  trackById = (_: number, post: Post) => post.id;
}
