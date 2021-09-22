import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { User } from '@shared/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserService {
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
}
