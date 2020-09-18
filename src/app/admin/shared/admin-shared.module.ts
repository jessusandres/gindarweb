import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminTopbarComponent} from './admin-topbar/admin-topbar.component';
import {AdminNavbarComponent} from './admin-navbar/admin-navbar.component';
import {AdminFooterComponent} from './admin-footer/admin-footer.component';
import {RouterModule} from '@angular/router';
import {LoadingContainerComponent} from './loading-container/loading-container.component';
import {ErrorContainerComponent} from './error-container/error-container.component';
import {SuccessContainerComponent} from './success-container/success-container.component';
import {InfoContainerComponent} from './info-container/info-container.component';

@NgModule({
  declarations: [
    AdminTopbarComponent,
    AdminNavbarComponent,
    AdminFooterComponent,
    LoadingContainerComponent,
    ErrorContainerComponent,
    SuccessContainerComponent,
    InfoContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AdminTopbarComponent,
    AdminNavbarComponent,
    AdminFooterComponent,
    LoadingContainerComponent,
    ErrorContainerComponent,
    SuccessContainerComponent,
    InfoContainerComponent
  ]
})
export class AdminSharedModule {
}
