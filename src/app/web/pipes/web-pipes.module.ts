import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ItemImagePipe} from './item-image.pipe';
import {SublinesFilterPipe} from './sublines-filter.pipe';



@NgModule({
  declarations: [
    ItemImagePipe,
    SublinesFilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ItemImagePipe,
    SublinesFilterPipe
  ]
})
export class WebPipesModule { }
