import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../shared/services/storage/storage.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private storage: StorageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.storage.get('user') && (state.url.indexOf("login") > -1 || state.url.indexOf("register") > -1)) {
            this.router.navigate(['/user/dashboard']);
            return true;
        }
        else if (this.storage.get('user')) {
            return true;
        }



        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}