export class User {
    private roles;
    constructor(
            public email: string, 
            public id: string, 
            private _token: string, 
            private _tokeExpirationDate: Date){}

    getToken(){
        if(!this._tokeExpirationDate || new Date() > this._tokeExpirationDate){
            return null;
        }
        return this._token; 
    }

    setRoles(customClaims = {}){
        this.roles = Object.entries(customClaims);    
    }

    getRoles(){
        return this.roles;
    }

}