import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ItemImagePipe} from './item-image.pipe';
import {SublinesFilterPipe} from './sublines-filter.pipe';
import { DiscountPipe } from './discount.pipe';



@NgModule({
  declarations: [
    ItemImagePipe,
    SublinesFilterPipe,
    DiscountPipe
  ],
  imports: [
    CommonModule
  ],
    exports: [
        ItemImagePipe,
        SublinesFilterPipe,
        DiscountPipe
    ]
})
export class WebPipesModule { }
