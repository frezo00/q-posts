import { Post, User } from '@shared/models';
import { Observable, of } from 'rxjs';

export class ServiceMocks {
  static postService = {
    getPosts$(): Observable<Post[]> {
      return of([]);
    },
    getPostById$(_id: number): Observable<Post> {
      return of({} as Post);
    },
    getPostComments$(_postId: number): Observable<Comment[]> {
      return of([]);
    }
  };

  static userService = {
    getUserById$(_id: number): Observable<User> {
      return of({} as User);
    }
  };
}
