import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './web/pages/home/home.component';
import {NotpagefoundComponent} from './web/notpagefound/notpagefound.component';
import {AdminRoutingModule} from './admin/admin-routing.module';
import {WebRoutingModule} from './web/web-routing.module';
// import {AppRoutes} from './app.routes';

const AppRoutes: Routes = [
  // {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: NotpagefoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' }),
    WebRoutingModule,
    AdminRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
