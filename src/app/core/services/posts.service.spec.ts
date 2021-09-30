import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ServiceMocks } from '@shared/mocks';

import { CommentsService } from './comments.service';
import { PostsService } from './posts.service';
import { UsersService } from './users.service';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PostsService,
        { provide: UsersService, useValue: ServiceMocks.usersService },
        { provide: CommentsService, useValue: ServiceMocks.commentsService }
      ]
    });
    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
