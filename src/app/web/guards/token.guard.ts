import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {

  constructor(private router: Router) {
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const token = localStorage.getItem('gindar_jwt');
    // console.log(token);
    if (token !== null) {
      const payload = JSON.parse(atob(token.split('.')[1]));

      if (payload.id) {
        this.router.navigate(['/']);
      }

      return false;
    } else {
      return true;
    }
  }

}
