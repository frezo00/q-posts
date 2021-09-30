import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Comment, Post, PostResponse, User } from '@shared/models';
import { BehaviorSubject, Observable, zip } from 'rxjs';
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
      exhaustMap(postsResponse =>
        zip(
          this._usersService.getAllUsersForPosts$(postsResponse),
          this._commentsService.getAllCommentsForPosts$(postsResponse)
        ).pipe(
          map(([users, comments]) =>
            postsResponse.map(post => {
              const postUser = users.find(user => user.id === post.userId);
              const postComments = comments.filter(comment => comment.postId === post.id);
              return { ...post, user: postUser, comments: postComments };
            })
          )
        )
      ),
      map(postsWithUser => postsWithUser.map(this._postWithoutUserId)),
      tap(posts => this._posts$.next(posts))
    );
  }

  getPostById$(id: number): Observable<Post> {
    return this._http
      .get<PostResponse>(`${this._baseUrl}/posts/${id}`)
      .pipe(
        exhaustMap(postResponse =>
          zip(
            this._usersService.getUserById$(postResponse.userId),
            this._commentsService.getPostComments$(postResponse.id)
          ).pipe(map(([user, comments]) => this._postWithoutUserId({ ...postResponse, user, comments })))
        )
      );
  }

  private _postWithoutUserId(postWithUser: PostResponse & { user?: User; comments?: Comment[] }): Post {
    const { userId, ...withoutUserId } = postWithUser;
    return withoutUserId;
  }
}
