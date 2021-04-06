import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService, AuthResponseData } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    responseObs: Observable<AuthResponseData>;

    constructor(private authSvc: AuthService, private router: Router){}
   
    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(f: NgForm){
        if(!f.valid){
            return;
        }
        const email = f.value.email.trim();
        const password  = f.value.password.trim();
        this.isLoading = true;
        if(this.isLoginMode){
            this.responseObs = this.authSvc.login(email, password);
        }else{
            this.responseObs = this.authSvc.signUp(email, password);
        } 


        this.responseObs.subscribe(responseData=> {
                this.isLoading = false;
                this.router.navigate(['/shopping']);
            }, errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                this.isLoading  = false;
        });
        
        f.reset();
    }
}