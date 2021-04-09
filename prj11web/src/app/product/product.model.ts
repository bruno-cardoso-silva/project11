import { Supplier } from "../supplier/supplier.model";

export enum UnitType {
    KG = 'KG',
    L = 'L',
    UN = 'UN'
}

export class Product {
    constructor(public name: string, 
                public producerName: string,
                public price: string,
                public supplier: Supplier,
                public unitType: UnitType,
                public amount: number){}
}