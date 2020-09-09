import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AdminLoginComponent} from './auth/admin-login/admin-login.component';
import {AdminRegisterComponent} from './auth/admin-register/admin-register.component';
import {AuthGuard} from './guards/auth.guard';
import {AdminTokenGuard} from './guards/admin-token.guard';
import {PagesComponent} from './pages/pages.component';


const AdminRoutes: Routes = [
  {
    path: 'admin', component: AdminComponent, children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'login', component: AdminLoginComponent, canActivate: [AdminTokenGuard]},
      {path: 'register', component: AdminRegisterComponent, canActivate: [AuthGuard]},
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: PagesComponent,
        // canActivateChild: [TokenVerificationGuard],
        loadChildren: () => import('./pages/adminpages-routing.module').then(m => m.AdminpagesRoutingModule)
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
