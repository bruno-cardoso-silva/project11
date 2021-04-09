import { Address } from "../shared/cep.service";

export class Supplier {
    address: Address;

    public setAddress(address: Address): void {
        this.address = address;
    }   
    
    public getAddress(): Address {
        if(this.address === null){
            return new Address();
        }
        return this.address;
    }   
    
    constructor(public name: string,
                public email: string, 
                public cnpj: string,
                public phone: string
                ){ }
}