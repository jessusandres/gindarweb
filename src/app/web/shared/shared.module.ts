import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdvertisementsComponent} from './header/advertisements/advertisements.component';
import {NavbarComponent} from './header/navbar/navbar.component';
import {HeaderComponent} from './header/header.component';
import {TopbarComponent} from './header/topbar/topbar.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule} from '@angular/router';
import {LoginModalComponent} from './modals/login-modal/login-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {FilterBoxComponent} from './filter-box/filter-box.component';
import {WebPipesModule} from '../pipes/web-pipes.module';

@NgModule({
  declarations: [
    AdvertisementsComponent,
    NavbarComponent,
    HeaderComponent,
    TopbarComponent,
    FooterComponent,
    LoginModalComponent,
    BreadcrumbsComponent,
    FilterBoxComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    WebPipesModule
  ],
  exports: [
    HeaderComponent,
    AdvertisementsComponent,
    TopbarComponent,
    NavbarComponent,
    FooterComponent,
    BreadcrumbsComponent,
    FilterBoxComponent
  ]
})
export class SharedModule {
}
