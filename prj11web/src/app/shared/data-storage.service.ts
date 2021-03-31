import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(public http: HttpClient, private authSrv: AuthService){}

    updateRecipes(){
    }

    fetchRecipes(){
    } 
}

