import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

// https://stackoverflow.com/questions/40150393/how-to-redirect-to-an-external-url-from-angular2-route-without-using-component/40421975 
@Injectable()
export class RedirectGuardSignOut implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

      window.location.href = route.data['externalUrl'];
      return true;
  }
}
