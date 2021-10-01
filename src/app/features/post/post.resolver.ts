import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { PostsService } from '@core/services';
import { Post } from '@shared/models';
import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class PostResolver implements Resolve<Post | null> {
  constructor(private _postsService: PostsService, private _router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Post | null> {
    const postId = route.paramMap.get('id');
    if (typeof postId === 'string' && !isNaN(+postId)) {
      return this._postsService.getPostById$(+postId).pipe(take(1));
    }
    return from(this._router.navigateByUrl('/404')).pipe(map(_ => null));
  }
}
