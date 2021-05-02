import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { InventoryOrder, InventoryTransactionType, Item } from "./item.model";
import { map, tap } from "rxjs/operators";
import { Supplier } from "../supplier/supplier.model";
import { Product } from "../product/product.model";

@Injectable({providedIn: 'root'})
export class InventoryService {
    checkInListChanged = new Subject<InventoryOrder[]>()
    checkOutListChanged = new Subject<InventoryOrder[]>()
    checkInList: InventoryOrder[];
    checkOutList: InventoryOrder[];

    private url = 'https://prj11web-default-rtdb.firebaseio.com';

    constructor(private http: HttpClient){ }
 
    updateInventoryCheckOut(checkOutList: InventoryOrder[]){
        return  this.updateInventory(checkOutList.concat(this.checkInList));
    }

    updateInventoryCheckIn(checkInList: InventoryOrder[]){
       return  this.updateInventory(checkInList.concat(this.checkOutList));
    }

    private updateInventory(inventoryList: InventoryOrder[]){
        return this.http
            .put(`${this.url}/inventory.json`, inventoryList)
    }

    fetchItems(){
        let observer =  this.http.get<InventoryOrder[]>(`${this.url}/inventory.json`)
        .pipe(
            map(inv => inv && inv.map(inv => inv)),
            tap(inv => {
                this.checkInList = inv.filter(i => i.transactionType === InventoryTransactionType.IN);
                this.checkOutList = inv.filter(i => i.transactionType === InventoryTransactionType.OUT);
                this.checkInListChanged.next(this.checkInList);                    
                this.checkOutListChanged.next(this.checkOutList);
            }), 
        )
        return observer;
    }

    getInventoryById(index: number, type: InventoryTransactionType){
        if(type === InventoryTransactionType.IN){
            return this.checkInList[index];
        }
        return  this.checkOutList[index];
    }

    deleteCheckIn(index: number){
        this.checkInList.splice(index, 1);
        this.updateInventoryCheckIn(this.checkInList)
                    .subscribe(inv => {
                        this.checkInListChanged.next(this.checkInList);
                    })
    }

    deleteCheckOut(index: number){
        this.checkOutList.splice(index, 1);
        this.updateInventoryCheckOut(this.checkOutList)
                    .subscribe(inv => {
                        this.checkOutListChanged.next(this.checkOutList)
                    })
    }

    getItemsByProductAndSupplier(supplier: Supplier, product: Product, type: InventoryTransactionType) {
        return  this.checkOutList.concat(this.checkInList)
                        .filter(i => i.transactionType === type)
                        .flatMap(inventory => {
                            return inventory.items
                                        .filter(items => 
                                            items.product.name === product.name  && 
                                            items.product.supplier.name === product.supplier.name);
                        });

    }

    compareSupplierFn(c1: any, c2:any): boolean {     
        return c1 && c2 ? c1.email === c2.email : c1 === c2; 
    }
    
    compareProductsFn(c1: any, c2:any): boolean {     
        return c1 && c2 ? c1.name === c2.name : c1 === c2; 
    }

    hasStock(items: Item[], supplier: Supplier, product: Product, type: InventoryTransactionType) {
        const listItemsIn = this.getItemsByProductAndSupplier(supplier, product, InventoryTransactionType.IN);        
        const listItemsOut = this.getItemsByProductAndSupplier(supplier, product, InventoryTransactionType.OUT);        
       
        const totalItemsIn = listItemsIn.reduce((a,b) =>{ return a + b['qtd']}, 0);
        const totalItemsOut = listItemsOut.reduce((a,b) =>{ return a + b['qtd']}, 0);
        const checkoutItemsCount = items.reduce((a,b) =>{ return a + b['qtd']}, 0);
        
       if((totalItemsIn - totalItemsOut) >= checkoutItemsCount){
            return true;
       }
       return false;
    }   

}