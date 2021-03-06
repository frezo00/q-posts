import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostComponent } from './post.component';
import { PostResolver } from './post.resolver';

const routes: Routes = [
  {
    path: '',
    component: PostComponent,
    resolve: {
      post: PostResolver
    }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRouting {}
