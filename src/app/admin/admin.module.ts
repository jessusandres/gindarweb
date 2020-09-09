import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminLoginComponent} from './auth/admin-login/admin-login.component';
import {AdminRegisterComponent} from './auth/admin-register/admin-register.component';

// import {PagesComponent} from './pages/pages.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    AdminRegisterComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  exports: [
    AdminRoutingModule
  ]
})
export class AdminModule {
}
