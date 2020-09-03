import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {WePageComponent} from './pages/we-page/we-page.component';
import {PromotionsComponent} from './pages/promotions/promotions.component';
import {ReleasesComponent} from './pages/releases/releases.component';
import {PrivacyPolicyComponent} from './pages/privacy-policy/privacy-policy.component';
import {ReturnPolicyComponent} from './pages/return-policy/return-policy.component';
import {NotpagefoundComponent} from './notpagefound/notpagefound/notpagefound.component';
import {ShowcaseComponent} from './pages/showcase/showcase.component';
import {ItemDetailComponent} from './pages/item-detail/item-detail.component';
import {RegisterComponent} from './auth/register/register.component';

export const AppRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'registro', component: RegisterComponent, data: {prev: ['Inicio'], page: 'Registro'}},
  {path: 'inicio', component: HomeComponent},
  {path: 'invicta/:brandCode', component: ShowcaseComponent},
  {path: 'vitrina', component: ShowcaseComponent, data: {prev: ['Inicio'], page: 'Vitrina'}},
  {path: 'vitrina/detalle/:itemcode', component: ItemDetailComponent, data: {prev: ['', 'Invicta'], page: 'Specialty Men Mod. 12847'}},
  {path: 'vitrina/:category', component: ShowcaseComponent},
  {path: 'vitrina/:category/:subcategory', component: ShowcaseComponent},
  {path: 'nosotros', component: WePageComponent, data: {prev: ['Inicio'], page: 'Nosotros'}},
  {path: 'promociones', component: PromotionsComponent, data: {prev: ['Inicio'], page: 'Promociones'}},
  {path: 'novedades', component: ReleasesComponent, data: {prev: ['Inicio'], page: 'Nuevos Ingresos'}},
  {path: 'privacidad', component: PrivacyPolicyComponent, data: {prev: ['Inicio'], page: 'Política de privacidad'}},
  {path: 'devoluciones', component: ReturnPolicyComponent, data: {prev: ['Inicio'], page: 'Política de devoluciones'}},
  {path: '**', pathMatch: 'full', component: NotpagefoundComponent},
];
