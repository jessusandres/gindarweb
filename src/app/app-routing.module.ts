import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {NotpagefoundComponent} from './notpagefound/notpagefound/notpagefound.component';
import {WePageComponent} from './pages/we-page/we-page.component';
import {PromotionsComponent} from './pages/promotions/promotions.component';
import {ReleasesComponent} from './pages/releases/releases.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'nosotros', component: WePageComponent },
  { path: 'promociones', component: PromotionsComponent },
  { path: 'novedades', component: ReleasesComponent },
  { path: '**', pathMatch: 'full', component: NotpagefoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
