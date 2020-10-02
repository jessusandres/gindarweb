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
import { CircleDiscountComponent } from './circle-discount/circle-discount.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {_MatMenuDirectivesModule, MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    AdvertisementsComponent,
    NavbarComponent,
    HeaderComponent,
    TopbarComponent,
    FooterComponent,
    LoginModalComponent,
    BreadcrumbsComponent,
    FilterBoxComponent,
    CircleDiscountComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    WebPipesModule,
    MatIconModule,
    MatButtonModule,
    _MatMenuDirectivesModule,
    MatMenuModule
  ],
    exports: [
        HeaderComponent,
        AdvertisementsComponent,
        TopbarComponent,
        NavbarComponent,
        FooterComponent,
        BreadcrumbsComponent,
        FilterBoxComponent,
        CircleDiscountComponent
    ]
})
export class SharedModule {
}
