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

  get posts(): Post[] {
    return this._posts$.getValue();
  }

  constructor(
    private _http: HttpClient,
    private _usersService: UsersService,
    private _commentsService: CommentsService
  ) {}

  getPosts$(): Observable<Post[]> {
    if (this.posts?.length > 1) {
      return this._posts$;
    }
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
      map(postsWithUser => {
        let posts = postsWithUser.map(this._postWithoutUserId);
        if (this.posts?.length === 1) {
          // Make sure not to lose updated post if there is any
          posts = posts.map(post => (post?.id === this.posts[0]?.id ? this.posts[0] : post));
        }
        return posts;
      }),
      tap(posts => this._posts$.next(posts))
    );
  }

  getPostById$(id: number): Observable<Post | null> {
    if (this.posts?.length) {
      return this._posts$.pipe(map(posts => posts.find(post => post?.id === id) || null));
    }
    return this._http.get<PostResponse>(`${this._baseUrl}/posts/${id}`).pipe(
      exhaustMap(postResponse =>
        zip(
          this._usersService.getUserById$(postResponse.userId),
          this._commentsService.getPostComments$(postResponse.id)
        ).pipe(map(([user, comments]) => this._postWithoutUserId({ ...postResponse, user, comments })))
      ),
      tap(post => {
        // If post isn't already in the 'posts' array, add it
        if (!this.posts?.map(p => p?.id).includes(post?.id)) {
          this._posts$.next([...this.posts, post]);
        }
      })
    );
  }

  updatePost(updatedPost: Post): void {
    const updatedPosts = this.posts.map(post => (post?.id === updatedPost?.id ? updatedPost : post));
    this._posts$.next(updatedPosts);
  }

  private _postWithoutUserId(postWithUser: PostResponse & { user?: User; comments?: Comment[] }): Post {
    const { userId, ...withoutUserId } = postWithUser;
    return withoutUserId;
  }
}
