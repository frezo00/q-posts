import { Component, Input } from '@angular/core';
import { Comment } from '@shared/models';

@Component({
  selector: 'q-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  @Input() comments: Comment[] = [];
}
