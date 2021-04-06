import { Supplier } from "../supplier/supplier.model";

export enum UnitType {
    KG = 'KG',
    L = 'L',
    UN = 'UN'
}

export class Product {
    name: string;
    producerName: string;
    price: number;
    supplier: Supplier;
    unityType: UnitType;
}