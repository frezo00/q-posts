import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Comment, PostResponse } from '@shared/models';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CommentsService {
  private _baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) {}

  getPostComments$(postId: number): Observable<Comment[]> {
    return this._http.get<Comment[]>(`${this._baseUrl}/posts/${postId}/comments`);
  }

  getAllCommentsForPosts$(posts: PostResponse[]): Observable<Comment[]> {
    return forkJoin([...posts.map(post => this.getPostComments$(post?.id))]).pipe(
      map(nestedComments => nestedComments.reduce((allComments, comments) => [...allComments, ...comments], []))
    );
  }
}
