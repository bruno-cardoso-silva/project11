import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService} from './auth.service'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authSvc: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.authSvc.user.pipe(
            take(1),
            exhaustMap(user => {
                if(!user){
                    return next.handle(req);
                }
                const newReq = req.clone({params: new HttpParams().set('auth', user.getToken())});
                return next.handle(newReq);
            })
        )

    }
}