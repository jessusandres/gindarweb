import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {NotpagefoundComponent} from './notpagefound/notpagefound/notpagefound.component';
import {WePageComponent} from './pages/we-page/we-page.component';
import {PromotionsComponent} from './pages/promotions/promotions.component';
import {ReleasesComponent} from './pages/releases/releases.component';
import {ReturnPolicyComponent} from './pages/return-policy/return-policy.component';
import {PrivacyPolicyComponent} from './pages/privacy-policy/privacy-policy.component';
import {AppRoutes} from './app.routes';


@NgModule({
  imports: [RouterModule.forRoot(AppRoutes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
