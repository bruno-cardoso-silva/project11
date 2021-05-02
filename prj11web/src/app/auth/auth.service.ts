import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, first, map, tap } from "rxjs/operators";
import { User } from "./user.model";
import { AngularFireFunctions } from '@angular/fire/functions';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private experirationDuration: any; 

    constructor(private http: HttpClient, private router: Router, private func: AngularFireFunctions){}

     signUp(email: string, password: string){
         return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJBqb3-8WwjPduz8RoLyf31bNcas6aTjc',
            {
                email: email,
                password: password,
                returnSecureToken: true  
            })
            .pipe(catchError(this.handleError));
     }

     login(email: string, password: string){
         return this.http
         .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJBqb3-8WwjPduz8RoLyf31bNcas6aTjc', 
         {
            email: email,
            password: password,
            returnSecureToken: true  
         })
         .pipe(catchError(this.handleError), 
         tap( response => {
                this.handleAuthentication(
                     response.email, 
                     response.localId, 
                     response.idToken, 
                     response.expiresIn)
                     })
         );
           
      }

    logout(){
          this.user.next(null);
          this.router.navigate(['/auth']);
          localStorage.removeItem('userData');
          if(this.experirationDuration){
              clearTimeout(this.experirationDuration);
          }
          this.experirationDuration = null;
    }

    autoLogout(expirationDuration: number){
        this.experirationDuration = setTimeout(()=> {
            this.logout();
        },expirationDuration)
    }

    autoLogin(){
        const userData: {     
        email: string, 
        id: string, 
        _token: string, 
        _tokeExpirationDate: number } = JSON.parse(localStorage.getItem('userData'));
      
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokeExpirationDate));

        if(loadedUser.getToken()){
            //ms
            const expiresIn = new Date(userData._tokeExpirationDate).getTime() - new Date().getTime(); 
            this.autoLogout(expiresIn * 1000);
            this.user.next(loadedUser);
        }    
        
    }

    getAuthUsers(): User[]{
        const authUsers =  this.func.httpsCallable('getAuthUsers');
        const users =  [];
        authUsers({}).subscribe(data => {   
            if(data && data.users){
                data.users.forEach(u => {
                    users.push(new User(u.email, u.uid, null, null));
                });
            }
        }, err => {
            console.log(err)
        });
        return users;

    }
    getUserById(uid: string){
        const userFunc =  this.func.httpsCallable('getUserById');
        return userFunc({'uid': uid});
    }

    getUserByEmail(email: string){
        const userFunc =  this.func.httpsCallable('getUserByEmail');
        return userFunc({'email': email});
    }

    addProviderClaim(email: string){
        const userFunc =  this.func.httpsCallable('addProviderRole');
        return userFunc({'email': email});
    }

    addAdminClaim(email: string){
        const userFunc =  this.func.httpsCallable('addAdminRole');
        return userFunc({'email': email});
    }


    getUserClaims(email: string){
        const userFunc =  this.func.httpsCallable('getUserClaims');
        return userFunc({'email': email});
    }

     private handleAuthentication(email: string, userId: string, token: string, expiresIn: string){
        const expirationDate = new Date(new Date().getTime() + +expiresIn* 1000);
        const user = new User(email,userId, token, expirationDate);
        this.autoLogout(+expiresIn * 1000)
        localStorage.setItem('userData', JSON.stringify(user));
        this.user.next(user); 
    }

    private handleError(errorResponse: HttpErrorResponse){
        let errorMessage = 'Unknown error occoured';
        if(!errorResponse.error || !errorResponse.error.error){
               return throwError(errorMessage);
        }
       switch(errorResponse.error.error.message){
        case 'EMAIL_EXISTS' :
            errorMessage = "This email already exists";
            break;
        case 'EMAIL_NOT_FOUND' :
            errorMessage = "Email not found";
            break;
        case 'INVALID_PASSWORD' : 
            errorMessage = "Password or Email is invalid";
            break;
        case 'INVALID_EMAIL' :
            errorMessage = "Email is not valid";
        break;
    
        }

      return throwError(errorMessage);
    }

} 


