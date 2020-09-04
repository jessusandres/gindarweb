import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdvertisementsComponent} from './header/advertisements/advertisements.component';
import {NavbarComponent} from './header/navbar/navbar.component';
import {HeaderComponent} from './header/header.component';
import { TopbarComponent } from './header/topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {CategoriesFilterPipe} from '../pipes/categories-filter.pipe';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FilterBoxComponent } from './filter-box/filter-box.component';

@NgModule({
  declarations: [
    AdvertisementsComponent,
    NavbarComponent,
    HeaderComponent,
    TopbarComponent,
    FooterComponent,
    CategoriesFilterPipe,
    LoginModalComponent,
    BreadcrumbsComponent,
    FilterBoxComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
    exports: [
        HeaderComponent,
        AdvertisementsComponent,
        TopbarComponent,
        NavbarComponent,
        FooterComponent,
        CategoriesFilterPipe,
        BreadcrumbsComponent,
        FilterBoxComponent
    ]
})
export class SharedModule {
}
