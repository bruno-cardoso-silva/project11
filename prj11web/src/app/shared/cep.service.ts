import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export class Address {
        public cep: string;
        public logradouro: string;
        complemento: string;
        public bairro: string;
        localidade: string;
        uf: string;
        ibge: string;
        gia: string;
        ddd: string;
        siafi: string;
        numero: string;
}

@Injectable({providedIn: 'root'})
export class CEPService {

    constructor(private http: HttpClient){ }
 

    getAddress(cep: string){
        return this.http.get<Address>(`https://viacep.com.br/ws/${cep}/json/`);
    }


}