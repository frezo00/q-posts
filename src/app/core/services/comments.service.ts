import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Comment } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable()
export class CommentsService {
  private _baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) {}

  getPostComments$(postId: number): Observable<Comment[]> {
    return this._http.get<Comment[]>(`${this._baseUrl}/posts/${postId}/comments`);
  }
}
