import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {StoreInfoComponent} from './store-info/store-info.component';
import {PagesComponent} from './pages.component';
import {AdminRegisterComponent} from '../auth/admin-register/admin-register.component';
import {ProfileComponent} from './profile/profile.component';
import {WhatsappSupportComponent} from './whatsapp-support/whatsapp-support.component';
import {ProductsComponent} from './products/products.component';

const adminRoutes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'info', component: StoreInfoComponent},
      {path: 'register', component: AdminRegisterComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'whatsapps', component: WhatsappSupportComponent},
      {path: 'products', component: ProductsComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminpagesRoutingModule {
}
