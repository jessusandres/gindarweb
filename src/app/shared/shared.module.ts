import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdvertisementsComponent} from './header/advertisements/advertisements.component';
import {NavbarComponent} from './header/navbar/navbar.component';
import {HeaderComponent} from './header/header.component';
import { TopbarComponent } from './header/topbar/topbar.component';
import { CarouselItemComponent } from './header/advertisements/carousel-item/carousel-item.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {CategoriesFilterPipe} from '../pipes/categories-filter.pipe';

@NgModule({
  declarations: [
    AdvertisementsComponent,
    NavbarComponent,
    HeaderComponent,
    TopbarComponent,
    CarouselItemComponent,
    FooterComponent,
    CategoriesFilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    AdvertisementsComponent,
    TopbarComponent,
    NavbarComponent,
    FooterComponent,
    CategoriesFilterPipe
  ]
})
export class SharedModule {
}
