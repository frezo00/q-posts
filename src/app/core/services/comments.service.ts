import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Comment, CommentRequest, PostResponse } from '@shared/models';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CommentsService {
  private _baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) {}

  getPostComments$(postId: number): Observable<Comment[]> {
    return this._http.get<Comment[]>(`${this._baseUrl}/posts/${postId}/comments`);
  }

  // This may be stupid to call 'getPostComments$()' for each post,
  // but in the real-life example this should be done by backend.
  getAllCommentsForPosts$(posts: PostResponse[]): Observable<Comment[]> {
    return forkJoin([...posts.map(post => this.getPostComments$(post?.id))]).pipe(
      map(nestedComments => nestedComments.reduce((allComments, comments) => [...allComments, ...comments], []))
    );
  }

  createComment$(commentData: CommentRequest): Observable<Comment> {
    return this._http.post<Comment>(`${this._baseUrl}/comments`, commentData);
  }
}
