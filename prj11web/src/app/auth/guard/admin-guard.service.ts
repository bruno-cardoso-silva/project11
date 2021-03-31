import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { map, take, switchMap } from "rxjs/operators";
import { AuthService } from "../auth.service";

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {

    constructor(private authSvc: AuthService, private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    | boolean
    | UrlTree 
    | Promise<boolean | UrlTree>    
    | Observable<boolean | UrlTree> {
        return this.authSvc.user.pipe(
                take(1),
                switchMap(user => this.authSvc.getUserClaims(user && user.email)),
                map(userAuth => {
                    if(!!userAuth){
                        if(userAuth.customClaims.admin){
                            this.router.createUrlTree(['/admin']);
                            return true;
                        }
                    }
                    this.router.createUrlTree(['/auth']);
                    return false;
                })
            )
    }

}