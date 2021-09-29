import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentBase, Post } from '@shared/models';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input() post!: Post;
  @Output() createComment = new EventEmitter<CommentBase>();

  showComments = false;

  toggleComments(show?: boolean): void {
    this.showComments = show ?? !this.showComments;
  }

  onNewComment(commentBody: string): void {
    this.createComment.emit({ body: commentBody, postId: this.post.id });
  }
}
