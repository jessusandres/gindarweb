import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WebComponent} from './web.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {StoreModule} from '@ngrx/store';
import {AppReducer} from './store/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/effects/auth.effects';
import {environment} from '../../environments/environment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from './shared/shared.module';
import {PagesModule} from './pages/pages.module';
import {NotpagefoundComponent} from './notpagefound/notpagefound.component';
import {RegisterComponent} from './auth/register/register.component';
import {WebRoutingModule} from './web-routing.module';

@NgModule({
  declarations: [WebComponent,
    NotpagefoundComponent,
    RegisterComponent],
  imports: [
    CommonModule,
    WebRoutingModule,
    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot([AuthEffects]),
    environment.storeDevTools,
    FormsModule,
    SharedModule,
    PagesModule,
    ReactiveFormsModule,
    // RouterModule
  ],
  exports: [
    // WebRoutingModule,
    SharedModule,
    // RouterModule
  ],
  bootstrap: [WebComponent]
})
export class WebModule {
}
