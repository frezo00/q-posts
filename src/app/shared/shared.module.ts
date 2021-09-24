import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, ScrollingModule],
  exports: [HttpClientModule, ScrollingModule]
})
export class SharedModule {}
