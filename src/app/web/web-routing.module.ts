import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {RegisterComponent} from './auth/register/register.component';
import {TokenGuard} from './guards/token.guard';
import {ContactComponent} from './pages/contact/contact.component';
import {ClaimComponent} from './pages/claim/claim.component';
import {CartComponent} from './pages/cart/cart.component';
import {AuthGuard} from './guards/auth.guard';
import {ShowcaseComponent} from './pages/showcase/showcase.component';
import {SearchComponent} from './pages/search/search.component';
import {ItemDetailComponent} from './pages/item-detail/item-detail.component';
import {WePageComponent} from './pages/we-page/we-page.component';
import {PromotionsComponent} from './pages/promotions/promotions.component';
import {ReleasesComponent} from './pages/releases/releases.component';
import {PrivacyPolicyComponent} from './pages/privacy-policy/privacy-policy.component';
import {ReturnPolicyComponent} from './pages/return-policy/return-policy.component';
import {WebComponent} from './web.component';
import {OrderConfirmComponent} from "./pages/order-confirm/order-confirm.component";
import {OrderGuard} from "./guards/order.guard";


const WebRoutes: Routes = [
  {
    path: '', component: WebComponent, children: [
      {path: '', component: HomeComponent, data: {reload: true}},
      {path: 'home', component: HomeComponent, data: {reload: true}},
      {path: 'inicio', component: HomeComponent, data: {reload: true}},
      {
        path: 'registro',
        component: RegisterComponent,
        data: {prev: [''], page: 'Registro', reload: true},
        canActivate: [TokenGuard]
      },
      {path: 'contacto', component: ContactComponent, data: {prev: [''], page: 'Contáctenos', reload: true}},
      {
        path: 'reclamos',
        component: ClaimComponent,
        data: {
          prev: [''],
          page: 'Libro de Reclamaciones',
          reload: true
        }
      },
      {
        path: 'carrito', component: CartComponent,
        data: {
          prev: [''], page: 'Carrito de compras'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'invicta/:query',
        data: {
          prev: [''],
          page: 'Vitrina'
        },
        component: ShowcaseComponent
      },
      {path: 'vitrina/buscar/:query', component: SearchComponent, data: {prev: [''], page: 'Búsqueda'}},
      {
        path: 'vitrina/10/detalle/:itemcode',
        component: ItemDetailComponent,
        data: {
          prev: ['', 'Vitrina'],
          page: 'Detalle de Producto'
        }
      },
      {
        path: 'vitrina/20/detalle/:itemcode',
        component: ItemDetailComponent,
        data: {
          prev: ['', 'Vitrina'],
          page: 'Detalle de Producto'
        }
      },
      {path: 'vitrina/20/:line', component: ShowcaseComponent, data: {prev: [''], page: 'Vitrina'}},
      {path: 'vitrina/10/:line', component: ShowcaseComponent, data: {prev: [''], page: 'Vitrina'}},
      {path: 'nosotros', component: WePageComponent, data: {prev: [''], page: 'Nosotros', reload: true}},
      {path: 'promociones', component: PromotionsComponent, data: {prev: [''], page: 'Promociones', reload: true}},
      {path: 'novedades', component: ReleasesComponent, data: {prev: [''], page: 'Nuevos Ingresos', reload: true}},
      {
        path: 'privacidad',
        component: PrivacyPolicyComponent,
        data: {prev: [''], page: 'Política de privacidad', reload: true}
      },
      {
        path: 'confirmacion-pedido',
        component: OrderConfirmComponent,
        canActivate: [OrderGuard],
        data: {prev: [''], page: 'Confirmación de pedido', reload: true}
      },
      {
        path: 'devoluciones',
        component: ReturnPolicyComponent,
        data: {prev: [''], page: 'Política de devoluciones', reload: true}
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(WebRoutes)],
  exports: [RouterModule]
})
export class WebRoutingModule {
}
