import { Post } from '@shared/models';
import { Observable, of } from 'rxjs';

export class ServiceMocks {
  static apiService = {
    getPosts$(): Observable<Post[]> {
      return of([]);
    },
    getPostById$(): Observable<Post> {
      return of({} as Post);
    }
  };
}
