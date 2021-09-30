import { CommentsService, PostsService, ProfileService, UsersService } from '@core/services';
import { Comment, CommentRequest, Post, PostResponse, Profile, User } from '@shared/models';
import { Observable, of } from 'rxjs';

export class ServiceMocks {
  static postsService = <Partial<PostsService>>{
    getPosts$(): Observable<Post[]> {
      return of([]);
    },
    getPostById$(_id: number): Observable<Post> {
      return of({} as Post);
    }
  };

  static usersService = <Partial<UsersService>>{
    getUserById$(_id: number): Observable<User> {
      return of({} as User);
    },
    getAllUsersForPosts$(_posts: PostResponse[]): Observable<User[]> {
      return of([]);
    }
  };

  static commentsService = <Partial<CommentsService>>{
    getPostComments$(_postId: number): Observable<Comment[]> {
      return of([]);
    },
    getAllCommentsForPosts$(_posts: PostResponse[]): Observable<Comment[]> {
      return of([]);
    },
    createComment$(_commentData: CommentRequest): Observable<Comment> {
      return of({} as Comment);
    }
  };

  static profileService = <Partial<ProfileService>>{
    getProfile$(): Observable<Profile> {
      return of({} as Profile);
    }
  };
}
