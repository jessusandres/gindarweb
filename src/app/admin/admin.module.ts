import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminLoginComponent} from './auth/admin-login/admin-login.component';
import {AdminRegisterComponent} from './auth/admin-register/admin-register.component';
import {AdminSharedModule} from './shared/admin-shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {AdminAuthReducer} from './store/reducers/admin-auth.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AdminAuthEffects} from './store/effects/admin-auth.effects';
import {AdminDashboardEffects} from './store/effects/admin-dashboard.effects';


@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    AdminRegisterComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminSharedModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('adminAuthState', AdminAuthReducer),
    EffectsModule.forFeature([AdminAuthEffects, AdminDashboardEffects]),
  ],
  exports: [
    AdminRoutingModule,
  ]
})
export class AdminModule {
}
