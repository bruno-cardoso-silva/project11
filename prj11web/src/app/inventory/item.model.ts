import { Product, UnitType } from "../product/product.model";
import { Supplier } from "../supplier/supplier.model";

export class Item {
    product: Product;
    qtd: number;
    un: UnitType;
    priceUn: number;   
}

export enum InventoryTransactionType {
    IN= 'IN',
    OUT= 'OUT'
}

export class InventoryOrder {
    constructor(
        public notaFiscal: string,
        public supplier: Supplier,
        public date: Date,
        public items: Item [],
        public transactionType: InventoryTransactionType
    ){}
}