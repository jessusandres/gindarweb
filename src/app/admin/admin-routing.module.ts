import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AdminLoginComponent} from './auth/admin-login/admin-login.component';
import {AdminTokenGuard} from './guards/admin-token.guard';


const AdminRoutes: Routes = [
  {
    path: 'admin', component: AdminComponent, children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'login', component: AdminLoginComponent, canActivate: [AdminTokenGuard]},
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/adminpages.module').then(m => m.AdminpagesModule),
        canLoad: [AdminTokenGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(AdminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
