import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {PagesComponent} from './pages.component';
import {StoreInfoComponent} from './store-info/store-info.component';
import {RouterModule} from '@angular/router';
import {AdminSharedModule} from '../shared/admin-shared.module';
import {AdminpagesRoutingModule} from './adminpages-routing.module';
import {StoreModule} from '@ngrx/store';
import {ProfileComponent} from './profile/profile.component';
import {WhatsappSupportComponent} from './whatsapp-support/whatsapp-support.component';
import {WstableComponent} from './whatsapp-support/wstable/wstable.component';
import {AdminAppReducer} from '../store/admin-app.reducer';
import {ReactiveFormsModule} from '@angular/forms';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    StoreInfoComponent,
    ProfileComponent,
    WhatsappSupportComponent,
    WstableComponent,
    ProductsComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        AdminSharedModule,
        AdminpagesRoutingModule,
        StoreModule.forFeature('adminState', AdminAppReducer),
        ReactiveFormsModule
    ],
  exports: [
    PagesComponent,
    HomeComponent
  ]
})
export class AdminpagesModule {
}
