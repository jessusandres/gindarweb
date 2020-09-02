import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {NotpagefoundComponent} from './notpagefound/notpagefound/notpagefound.component';
import {WePageComponent} from './pages/we-page/we-page.component';
import {PromotionsComponent} from './pages/promotions/promotions.component';
import {ReleasesComponent} from './pages/releases/releases.component';
import {ReturnPolicyComponent} from './pages/return-policy/return-policy.component';
import {PrivacyPolicyComponent} from './pages/privacy-policy/privacy-policy.component';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {prev: []}},
  {path: 'home', component: HomeComponent, data: {prev: []}},
  {path: 'inicio', component: HomeComponent, data: {prev: []}},
  {path: 'nosotros', component: WePageComponent, data: {prev: ['Inicio']}},
  {path: 'promociones', component: PromotionsComponent, data: {prev: ['Inicio']}},
  {path: 'novedades', component: ReleasesComponent, data: {prev: ['Inicio']}},
  {path: 'privacidad', component: PrivacyPolicyComponent, data: {prev: ['Inicio']}},
  {path: 'devoluciones', component: ReturnPolicyComponent, data: {prev: ['Inicio']}},
  {path: '**', pathMatch: 'full', component: NotpagefoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
