import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommentFormComponent, CommentsComponent, PostCardComponent } from './components';
import { FormControlErrorPipe, SearchPipe } from './pipes';

@NgModule({
  declarations: [
    // Components
    CommentFormComponent,
    CommentsComponent,
    PostCardComponent,

    // Pipes
    FormControlErrorPipe,
    SearchPipe
  ],
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, RouterModule],
  exports: [
    // Modules
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    // Components
    CommentFormComponent,
    CommentsComponent,
    PostCardComponent,

    // Pipes
    FormControlErrorPipe,
    SearchPipe
  ]
})
export class SharedModule {}
