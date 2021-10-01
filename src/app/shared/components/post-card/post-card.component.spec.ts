import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommentsService, PostsService, ProfileService } from '@core/services';
import { ServiceMocks } from '@shared/mocks';
import { Comment, Post } from '@shared/models';
import { of } from 'rxjs';

import { PostCardComponent } from './post-card.component';

describe('PostCardComponent', () => {
  let component: PostCardComponent;
  let fixture: ComponentFixture<PostCardComponent>;
  let postsService: PostsService;
  let commentsService: CommentsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PostCardComponent],
      providers: [
        ChangeDetectorRef,
        { provide: PostsService, useValue: ServiceMocks.postsService },
        { provide: CommentsService, useValue: ServiceMocks.commentsService },
        { provide: ProfileService, useValue: ServiceMocks.profileService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCardComponent);
    component = fixture.componentInstance;

    postsService = TestBed.inject(PostsService);
    commentsService = TestBed.inject(CommentsService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#toggleComments() method', () => {
    it('should toggle the #showComments value', () => {
      // Initial
      expect(component.showComments).toEqual(false);

      component.toggleComments();
      expect(component.showComments).toEqual(true);
    });

    it('should set the #showComments value if passed as parameter', () => {
      // Initial
      expect(component.showComments).toEqual(false);

      component.toggleComments(true);
      expect(component.showComments).toEqual(true);

      component.toggleComments(false);
      expect(component.showComments).toEqual(false);
    });
  });

  describe('#onNewComment() method', () => {
    it('should update current post with the new comment', fakeAsync(() => {
      const commentText = 'Hello world';
      const newComment: Comment = {
        id: 1,
        postId: 1,
        body: commentText,
        name: 'Foo',
        email: 'bar'
      };
      const post: Post = {
        id: 1,
        body: 'Test',
        title: 'Post',
        comments: []
      };

      spyOn(commentsService, 'createComment$').and.returnValue(of(newComment));
      const updatePostSpy = spyOn(postsService, 'updatePost');

      component.post = post;
      component.onNewComment(commentText);
      tick();

      expect(component.post.comments).toContain(newComment);
      expect(updatePostSpy).toHaveBeenCalledTimes(1);
      expect(updatePostSpy).toHaveBeenCalledWith({ ...post, comments: [newComment] });
    }));
  });
});
