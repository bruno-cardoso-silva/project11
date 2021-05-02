import { Supplier } from "../supplier/supplier.model";

export enum UnitType {
    KG = 'KG',
    L = 'L',
    UN = 'UN'
}


export class Product {
    public code: string;
    constructor(public name: string, 
                public producerName: string,
                public buyPrice: number,
                public sellPrice: number,
                public supplier: Supplier,
                public unitType: UnitType,
                public amount: number,
                public dueDate: Date,
                public producedDate: Date){}
}