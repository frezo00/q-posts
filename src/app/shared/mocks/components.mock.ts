import { Component, Input } from '@angular/core';
import { Post } from '@shared/models';

@Component({
  selector: 'q-comment-form',
  template: ''
})
export class MockCommentFormComponent {}

@Component({
  selector: 'q-comments',
  template: ''
})
export class MockCommentsComponent {}

@Component({
  selector: 'q-post-card',
  template: ''
})
export class MockPostCardComponent {
  @Input() post!: Post;
  @Input() isPostPage = false;
  @Input() showPostComments = false;
}
