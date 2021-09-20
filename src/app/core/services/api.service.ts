import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  private _baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private _http: HttpClient) {}

  getPosts$(): Observable<Post[]> {
    return this._http.get<Post[]>(`${this._baseUrl}/posts`);
  }

  getPostsById$(id: number): Observable<Post> {
    return this._http.get<Post>(`${this._baseUrl}/posts/${id}`);
  }
}
