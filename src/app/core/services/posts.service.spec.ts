import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { environment } from '@environments/environment';
import { ServiceMocks } from '@shared/mocks';
import { Comment, Post, PostResponse, User } from '@shared/models';

import { CommentsService } from './comments.service';
import { PostsService } from './posts.service';
import { UsersService } from './users.service';

describe('PostsService', () => {
  let postsService: PostsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PostsService,
        { provide: UsersService, useValue: ServiceMocks.usersService },
        { provide: CommentsService, useValue: ServiceMocks.commentsService }
      ]
    });
    postsService = TestBed.inject(PostsService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(postsService).toBeTruthy();
  });

  describe('#getPosts$() method', () => {
    it('should do HTTP GET request and return Observable of posts', fakeAsync(() => {
      const posts: PostResponse[] = [{ id: 1, body: 'Test', title: 'Post', userId: 1 }];
      let responsePosts: Post[] = [];

      postsService.getPosts$().subscribe(response => (responsePosts = response));

      const request = http.expectOne(`${environment.baseUrl}/posts`);
      request.flush(posts);
      tick();

      expect(request.request.method).toEqual('GET');
      expect(postsService.posts.length).toEqual(posts.length);
      expect(postsService.posts.map(post => post.title)).toContain(posts[0].title);
      expect(JSON.stringify(postsService.posts)).toEqual(JSON.stringify(responsePosts));
    }));
  });

  describe('#getPostById$() method', () => {
    it('should do HTTP GET request and return Observable of a single Post', fakeAsync(() => {
      const postId = 1;
      const post: PostResponse = { id: postId, body: 'Test', title: 'Post', userId: 1 };
      const expectedPost: Post = {
        id: postId,
        body: 'Test',
        title: 'Post',
        user: {} as User,
        comments: []
      };
      let responsePost: Post | null = null;

      postsService.getPostById$(1).subscribe(response => (responsePost = response));

      const request = http.expectOne(`${environment.baseUrl}/posts/${postId}`);
      request.flush(post);
      tick();

      expect(request.request.method).toEqual('GET');
      expect((responsePost as any)['id']).toEqual(postId);
      expect(JSON.stringify(responsePost)).toEqual(JSON.stringify(expectedPost));
    }));
  });

  describe('#updatePost() method', () => {
    it('should update post', () => {
      const comment: Comment = {
        id: 1,
        postId: 1,
        body: 'Hello',
        name: 'Foo',
        email: 'bar'
      };
      const initialPost: Post = {
        id: 1,
        body: 'Test',
        title: 'Post',
        user: {} as User,
        comments: []
      };
      const updatedPost: Post = { ...initialPost, comments: [comment] };

      postsService.posts.push(initialPost);
      postsService.updatePost(updatedPost);

      expect(JSON.stringify(postsService.posts)).toEqual(JSON.stringify([updatedPost]));
    });
  });
});
