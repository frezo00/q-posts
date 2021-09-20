import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { PostsComponent } from './posts.component';
import { PostsRouting } from './posts.routing';

@NgModule({
  declarations: [PostsComponent],
  imports: [CommonModule, PostsRouting, SharedModule]
})
export class PostsModule {}
