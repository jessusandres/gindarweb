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
import {SearchComponent} from './pages/search/search.component';
import {CartComponent} from './pages/cart/cart.component';
import {ContactComponent} from './pages/contact/contact.component';
import {ClaimComponent} from './pages/claim/claim.component';

export const AppRoutes: Routes = [
  {path: '', component: HomeComponent, data: {reload: true}},
  {path: 'home', component: HomeComponent, data: {reload: true}},
  {path: 'inicio', component: HomeComponent, data: {reload: true}},
  {path: 'registro', component: RegisterComponent, data: {prev: [''], page: 'Registro', reload: true}},
  {path: 'contacto', component: ContactComponent, data: {prev: [''], page: 'Contáctenos', reload: true}},
  {path: 'reclamo', component: ClaimComponent, data: {prev: [''], page: 'Libro de Reclamaciones', reload: true}},
  {path: 'carrito', component: CartComponent, data: {prev: [''], page: 'Carrito de compras'}},
  {path: 'invicta/:brandCode', component: ShowcaseComponent},
  {path: 'vitrina', component: ShowcaseComponent, data: {prev: [''], page: 'Vitrina'}},
  {path: 'vitrina/buscar/:query', component: SearchComponent, data: {prev: [''], page: 'Búsqueda'}},
  {path: 'vitrina/detalle/:itemcode', component: ItemDetailComponent, data: {prev: ['', 'Invicta'], page: 'Specialty Men Mod. 12847'}},
  {path: 'vitrina/:category', component: ShowcaseComponent},
  {path: 'vitrina/:category/:subcategory', component: ShowcaseComponent},
  {path: 'nosotros', component: WePageComponent, data: {prev: [''], page: 'Nosotros', reload: true}},
  {path: 'promociones', component: PromotionsComponent, data: {prev: [''], page: 'Promociones', reload: true}},
  {path: 'novedades', component: ReleasesComponent, data: {prev: [''], page: 'Nuevos Ingresos', reload: true}},
  {path: 'privacidad', component: PrivacyPolicyComponent, data: {prev: [''], page: 'Política de privacidad', reload: true}},
  {path: 'devoluciones', component: ReturnPolicyComponent, data: {prev: [''], page: 'Política de devoluciones', reload: true}},
  {path: '**', pathMatch: 'full', component: NotpagefoundComponent},
];
