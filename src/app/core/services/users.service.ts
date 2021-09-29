import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { PostResponse, User } from '@shared/models';
import { __uniques } from '@shared/utils';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class UsersService {
  private _baseUrl = environment.baseUrl;

  private _users = new BehaviorSubject<User[]>([]);

  get users(): User[] {
    return this._users.getValue();
  }

  constructor(private _http: HttpClient) {}

  getUserById$(id: number): Observable<User> {
    return this._http
      .get<User>(`${this._baseUrl}/users/${id}`)
      .pipe(tap(user => this._users.next([...this.users, user])));
  }

  getAllUsersForPosts$(posts: PostResponse[]): Observable<User[]> {
    const uniqueUserIds = __uniques(posts.map(post => post.userId));
    return forkJoin([...uniqueUserIds.map(userId => this.getUserById$(userId))]);
  }
}
