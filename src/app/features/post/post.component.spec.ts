import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MockPostCardComponent } from '@shared/mocks';
import { Post } from '@shared/models';
import { of } from 'rxjs';

import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostComponent, MockPostCardComponent],
      providers: [{ provide: ActivatedRoute, useValue: { data: of({ post: {} as Post }) } }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set #post$', done => {
    component.post$.subscribe(post => {
      expect(post).toEqual({} as Post);
      done();
    });
  });
});
