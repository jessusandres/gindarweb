import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {WePageComponent} from './we-page/we-page.component';
import {SharedModule} from '../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import { ReleasesComponent } from './releases/releases.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { CarouselItemComponent } from './home/carousel-item/carousel-item.component';


@NgModule({
  declarations: [
    HomeComponent,
    WePageComponent,
    ReleasesComponent,
    PromotionsComponent,
    CarouselItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [
    HomeComponent,
    WePageComponent
  ]
})
export class PagesModule {
}
