import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'q-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Output() commentCreate = new EventEmitter<string>();

  commentForm!: FormGroup;
  maxLength = 500;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.commentForm = this._formBuilder.group({
      comment: ['', [Validators.required, Validators.maxLength(this.maxLength)]]
    });
  }

  onCommentSubmit(): void {
    if (this.commentForm.invalid) {
      this.commentForm?.markAllAsTouched();
      return;
    }

    const commentText: string = this.commentForm.get('comment')?.value;
    this.commentCreate.emit(commentText);
    this.commentForm.reset();
  }
}
