import { Component, OnInit } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Post } from '@shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts$!: Observable<Post[]>;

  constructor(private _apiService: ApiService) {}

  ngOnInit(): void {
    this.posts$ = this._apiService.getPosts$();
  }
}
