import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '@shared/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post$!: Observable<Post>;

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.post$ = this._route.data.pipe(map(data => data.post as Post));
  }
}
