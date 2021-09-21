import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { PostComponent } from './post.component';
import { PostResolver } from './post.resolver';
import { PostRouting } from './post.routing';

@NgModule({
  declarations: [PostComponent],
  imports: [CommonModule, PostRouting, SharedModule],
  providers: [PostResolver]
})
export class PostModule {}
