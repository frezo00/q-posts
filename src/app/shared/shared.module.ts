import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [SearchPipe],
  imports: [CommonModule, HttpClientModule, ScrollingModule, FormsModule],
  exports: [HttpClientModule, ScrollingModule, FormsModule, SearchPipe]
})
export class SharedModule {}
