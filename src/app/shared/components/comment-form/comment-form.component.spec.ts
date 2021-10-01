import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MockFormControlErrorPipe } from '@shared/mocks';

import { CommentFormComponent } from './comment-form.component';

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CommentFormComponent, MockFormControlErrorPipe],
      providers: [FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the #commentForm', () => {
    expect(component.commentForm).toBeDefined();
    expect(component.commentForm.get('comment')).toBeDefined();
  });

  describe('onCommentSubmit() method', () => {
    it('should mark controls as touched if form invalid', () => {
      const spy = spyOn(component.commentForm, 'markAllAsTouched');

      component.onCommentSubmit();

      expect(component.commentForm.invalid).toEqual(true);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should emit comment text and reset form', () => {
      const resetSpy = spyOn(component.commentForm, 'reset');
      const emitSpy = spyOn(component.commentCreate, 'emit');
      const commentText = 'Hello world';

      component.commentForm.patchValue({ comment: commentText });
      component.onCommentSubmit();

      expect(component.commentForm.get('comment')?.value).toEqual(commentText);
      expect(emitSpy).toHaveBeenCalledTimes(1);
      expect(emitSpy).toHaveBeenCalledWith(commentText);
      expect(resetSpy).toHaveBeenCalledTimes(1);
    });
  });
});
