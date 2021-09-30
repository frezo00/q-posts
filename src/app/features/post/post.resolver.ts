import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { PostsService } from '@core/services';
import { Post } from '@shared/models';
import { Observable, of } from 'rxjs';

@Injectable()
export class PostResolver implements Resolve<Post | null> {
  constructor(private _postsService: PostsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Post | null> {
    const postId = route.paramMap.get('id');
    if (typeof postId === 'string') {
      return this._postsService.getPostById$(+postId);
    }
    return of(null);
  }
}
