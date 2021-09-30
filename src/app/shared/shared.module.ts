import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentsComponent } from './components/comments/comments.component';
import { FormControlErrorPipe, SearchPipe } from './pipes';

@NgModule({
  declarations: [CommentFormComponent, CommentsComponent, FormControlErrorPipe, SearchPipe],
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, ScrollingModule],
  exports: [
    // Modules
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ScrollingModule,

    // Components
    CommentFormComponent,
    CommentsComponent,

    // Pipes
    FormControlErrorPipe,
    SearchPipe
  ]
})
export class SharedModule {}
