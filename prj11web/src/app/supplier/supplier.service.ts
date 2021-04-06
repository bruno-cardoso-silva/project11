import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Supplier } from "./supplier.model";
import { Subject } from "rxjs";
import { map,tap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class SupplierService {
    supplierChanged = new Subject<Supplier []>()
    suppliers: Supplier[];

    private url = 'https://prj11web-default-rtdb.firebaseio.com';

    constructor(private http: HttpClient){ }
 
    updateSuppliers(suppliers: Supplier []){
        return this.http
            .put(`${this.url}/suppliers.json`, suppliers)
    }

    fetchSuppliers(){
        let observer =  this.http.get<Supplier[]>(`${this.url}/suppliers.json`)
        .pipe(
            map(suppliers => {
                return suppliers.map(supplier => {
                    return supplier;
                });
            }),
            tap(suppliers => {
                this.suppliers = suppliers;
                this.supplierChanged.next(this.suppliers.slice());
            }), 
        )
        return observer;
    }

    getSupplierById(id: string){
            return this.suppliers[id];
    }

    deleteSupplier(index: number){
        this.suppliers.splice(index, 1);
        this.updateSuppliers(this.suppliers).subscribe(suppliers => {
            this.supplierChanged.next(this.suppliers.slice());
        })
    }
}