import { ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { CommentsService, ProfileService } from '@core/services';
import { CommentBase, Post } from '@shared/models';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'q-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnDestroy {
  @Input() post!: Post;

  destroy$ = new Subject();
  showComments = false;

  constructor(
    private _commentsService: CommentsService,
    private _profileService: ProfileService,
    private _cdRef: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleComments(show?: boolean): void {
    this.showComments = show ?? !this.showComments;
  }

  onNewComment(commentBody: string): void {
    const commentBase: CommentBase = { body: commentBody, postId: this.post.id };

    this._profileService
      .getProfile$()
      .pipe(
        switchMap(profile => this._commentsService.createComment$({ ...commentBase, ...profile })),
        takeUntil(this.destroy$)
      )
      .subscribe(newComment => {
        this.post.comments?.push(newComment);
        this._cdRef.markForCheck();
      });
  }
}
