import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Comment, Post, PostResponse, User } from '@shared/models';
import { __uniques } from '@shared/utils';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { exhaustMap, map, tap } from 'rxjs/operators';

import { CommentsService } from './comments.service';
import { UsersService } from './users.service';

@Injectable()
export class PostsService {
  private _baseUrl = environment.baseUrl;

  private _posts$ = new BehaviorSubject<Post[]>([]);

  constructor(
    private _http: HttpClient,
    private _usersService: UsersService,
    private _commentsService: CommentsService
  ) {}

  getPosts$(): Observable<Post[]> {
    return this._http.get<PostResponse[]>(`${this._baseUrl}/posts`).pipe(
      exhaustMap(postsResponse => {
        const uniqueUserIds = __uniques(postsResponse.map(post => post.userId));
        return forkJoin([...uniqueUserIds.map(userId => this._usersService.getUserById$(userId))]).pipe(
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
          forkJoin([
            this._usersService.getUserById$(postResponse.userId),
            this._commentsService.getPostComments$(postResponse.id)
          ]).pipe(map(([user, comments]) => this._postWithoutUserId({ ...postResponse, user, comments })))
        )
      );
  }

  private _postWithoutUserId(postWithUser: PostResponse & { user?: User; comments?: Comment[] }): Post {
    const { userId, ...withoutUserId } = postWithUser;
    return withoutUserId;
  }
}
