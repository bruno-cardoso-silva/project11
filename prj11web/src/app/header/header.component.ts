import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header', 
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    collapsed = true;
    isAuthenticated = false;
    isAdmin  = false;
    isProvider = false;
    private userSub: Subscription;
    
    constructor(private dataStorageSvc: DataStorageService,
                private authSvc: AuthService){   }
 
    ngOnInit(){ 
        this.userSub = this.authSvc.user.subscribe(user => {
            this.isAuthenticated = !!user;
            if(this.isAuthenticated){
                this.authSvc.getUserClaims(user.email)
                    .subscribe(authUser => {
                        this.isProvider = authUser.customClaims && authUser.customClaims.provider === true;
                        this.isAdmin = authUser.customClaims && authUser.customClaims.admin === true;
                    })
            }
        })
    }
    
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

    onSaveClicked(){
//        this.dataStorageSvc.updateRecipes();
    }

    onFetchRecipes(){
  //      this.dataStorageSvc.fetchRecipes();
    }

    onLogout(){
        this.authSvc.logout();
    }
}