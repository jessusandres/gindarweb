import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ItemImagePipe} from './item-image.pipe';
import {SublinesFilterPipe} from './sublines-filter.pipe';
import { DiscountPipe } from './discount.pipe';
import { TotalStorePipe } from './total-store.pipe';



@NgModule({
  declarations: [
    ItemImagePipe,
    SublinesFilterPipe,
    DiscountPipe,
    TotalStorePipe
  ],
  imports: [
    CommonModule
  ],
    exports: [
        ItemImagePipe,
        SublinesFilterPipe,
        DiscountPipe,
        TotalStorePipe
    ]
})
export class WebPipesModule { }
