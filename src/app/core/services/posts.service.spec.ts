import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ServiceMocks } from '@shared/mocks';

import { PostsService } from './posts.service';
import { UserService } from './user.service';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService, { provide: UserService, useValue: ServiceMocks.userService }]
    });
    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
