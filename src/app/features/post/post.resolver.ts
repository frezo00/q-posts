import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ApiService } from '@core/services/api.service';
import { Post } from '@shared/models';
import { Observable, of } from 'rxjs';

@Injectable()
export class PostResolver implements Resolve<Post | null> {
  constructor(private _apiService: ApiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Post | null> {
    const postId = route.paramMap.get('id');
    if (typeof postId === 'string') {
      return this._apiService.getPostsById$(+postId);
    }
    return of(null);
  }
}
