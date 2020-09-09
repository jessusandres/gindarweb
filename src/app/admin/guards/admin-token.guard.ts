import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminTokenGuard implements CanActivate {

  constructor(private router: Router) {
  }


  canActivate(
    next: ActivatedRouteSnapshot): boolean {
    const adminToken = localStorage.getItem('adm__rwo');
    console.log(adminToken);
    if (adminToken !== null) {
      this.router.navigate(['admin/dashboard']);
      return false;
    } else {
      return true;
    }
  }

}
