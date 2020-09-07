import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import {environment} from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import {AppReducer} from './store/app.reducer';
import {AuthEffects} from './store/effects/auth.effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NotpagefoundComponent } from './notpagefound/notpagefound/notpagefound.component';
import {SharedModule} from './shared/shared.module';
import {PagesModule} from './pages/pages.module';
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NotpagefoundComponent,
    RegisterComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot(AppReducer),
        EffectsModule.forRoot([AuthEffects]),
        environment.storeDevTools,
        FormsModule,
        SharedModule,
        PagesModule,
        ReactiveFormsModule
    ],
  providers: [],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

