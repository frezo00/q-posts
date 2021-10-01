import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PostsService } from '@core/services';
import { MockPostCardComponent, MockSearchPipe, ServiceMocks } from '@shared/mocks';
import { Post } from '@shared/models';

import { PostsComponent } from './posts.component';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PostsComponent, MockPostCardComponent, MockSearchPipe],
      providers: [{ provide: PostsService, useValue: ServiceMocks.postsService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set #posts$', done => {
    component.posts$.subscribe(posts => {
      expect(posts).toEqual([]);
      done();
    });
  });

  describe('#trackById() method', () => {
    it('should return post ID', () => {
      const result = component.trackById(0, { id: 1 } as Post);
      expect(result).toEqual(1);
    });
  });
});
