import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WebComponent} from './web.component';

import {environment} from '../../environments/environment';

import {NotpagefoundComponent} from './notpagefound/notpagefound.component';
import {RegisterComponent} from './auth/register/register.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from './shared/shared.module';
import {PagesModule} from './pages/pages.module';
import {WebRoutingModule} from './web-routing.module';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/effects/auth.effects';

import {AppReducer} from './store/app.reducer';

import {ItemsEffects} from './store/effects/items.effects';
import {BrandsEffects} from './store/effects/brands.effects';
import {SublinesEffects} from './store/effects/sublines.effects';
import {ItemEffects} from './store/effects/item.effects';
import {CartEffects} from './store/effects/cart.effects';
import {UiEffects} from './store/effects/ui.effects';
import {OrderEffects} from "./store/effects/order.effects";

@NgModule({
  declarations: [WebComponent,
    NotpagefoundComponent,
    RegisterComponent],
  imports: [
    CommonModule,
    WebRoutingModule,
    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot([
      AuthEffects,
      UiEffects,
      ItemsEffects,
      ItemEffects,
      BrandsEffects,
      SublinesEffects,
      CartEffects,
      OrderEffects]),
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
