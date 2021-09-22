import { Component, OnInit } from '@angular/core';
import { PostService } from '@core/services';
import { Post } from '@shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts$!: Observable<Post[]>;

  constructor(private _postService: PostService) {}

  ngOnInit(): void {
    this.posts$ = this._postService.getPosts$();
  }
}
