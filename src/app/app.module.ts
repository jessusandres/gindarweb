import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
// import {StoreModule} from '@ngrx/store';
// import {environment} from '../environments/environment';
// import {EffectsModule} from '@ngrx/effects';
// import {AppReducer} from './web/store/app.reducer';
// import {AuthEffects} from './web/store/effects/auth.effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {NotpagefoundComponent} from './web/notpagefound/notpagefound/notpagefound.component';
import {SharedModule} from './web/shared/shared.module';
import {PagesModule} from './web/pages/pages.module';
// import {RegisterComponent} from './web/auth/register/register.component';
import {WebModule} from './web/web.module';
import {AdminModule} from './admin/admin.module';
// import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // StoreModule.forRoot(AppReducer),
    // EffectsModule.forRoot([AuthEffects]),
    // environment.storeDevTools,
    FormsModule,
    // SharedModule,
    // PagesModule,
    ReactiveFormsModule,
    WebModule,
    AdminModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

