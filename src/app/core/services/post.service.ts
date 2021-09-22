import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Comment, Post, PostResponse, User } from '@shared/models';
import { __uniques } from '@shared/utils';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { exhaustMap, map, tap } from 'rxjs/operators';

import { UserService } from './user.service';

@Injectable()
export class PostService {
  private _baseUrl = environment.baseUrl;

  private _posts$ = new BehaviorSubject<Post[]>([]);

  constructor(private _http: HttpClient, private _userService: UserService) {}

  getPosts$(): Observable<Post[]> {
    return this._http.get<PostResponse[]>(`${this._baseUrl}/posts`).pipe(
      exhaustMap(postsResponse => {
        const uniqueUserIds = postsResponse.map(post => post.userId).filter(__uniques);
        return forkJoin([...uniqueUserIds.map(userId => this._userService.getUserById$(userId))]).pipe(
          map(users => postsResponse.map(post => ({ ...post, user: users.find(user => user.id === post.userId) })))
        );
      }),
      map(postsWithUser => postsWithUser.map(this._postWithoutUserId)),
      tap(posts => this._posts$.next(posts))
    );
  }

  getPostById$(id: number): Observable<Post> {
    return this._http
      .get<PostResponse>(`${this._baseUrl}/posts/${id}`)
      .pipe(
        exhaustMap(postResponse =>
          forkJoin([this._userService.getUserById$(postResponse.userId), this.getPostComments$(postResponse.id)]).pipe(
            map(([user, comments]) => this._postWithoutUserId({ ...postResponse, user, comments }))
          )
        )
      );
  }

  getPostComments$(postId: number): Observable<Comment[]> {
    return this._http.get<Comment[]>(`${this._baseUrl}/posts/${postId}/comments`);
  }

  private _postWithoutUserId(postWithUser: PostResponse & { user?: User; comments?: Comment[] }): Post {
    const { userId, ...withoutUserId } = postWithUser;
    return withoutUserId;
  }
}
