import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ItemImagePipe} from './item-image.pipe';
import {SublinesFilterPipe} from './sublines-filter.pipe';
import { DiscountPipe } from './discount.pipe';
import { TotalStorePipe } from './total-store.pipe';
import { SliderImagePipe } from './slider-image.pipe';
import { SanitizerHtmlPipe } from './sanitizer-html.pipe';
import { CoverSquareImagePipe } from './cover-square-image.pipe';
import { CoverSquareLinkPipe } from './cover-square-link.pipe';



@NgModule({
  declarations: [
    ItemImagePipe,
    SublinesFilterPipe,
    DiscountPipe,
    TotalStorePipe,
    SliderImagePipe,
    SanitizerHtmlPipe,
    CoverSquareImagePipe,
    CoverSquareLinkPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ItemImagePipe,
    SublinesFilterPipe,
    DiscountPipe,
    TotalStorePipe,
    SliderImagePipe,
    SanitizerHtmlPipe,
    CoverSquareImagePipe,
    CoverSquareLinkPipe
  ]
})
export class WebPipesModule { }
