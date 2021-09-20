import { Component, OnInit } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Post } from '@shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  posts$!: Observable<Post[]>;

  constructor(private _apiService: ApiService) {}

  ngOnInit(): void {
    this.posts$ = this._apiService.getPosts$();
  }
}
