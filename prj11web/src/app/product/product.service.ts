import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { filter, map,tap } from "rxjs/operators";
import { Product } from "./product.model";
import { Supplier } from "../supplier/supplier.model";

@Injectable({providedIn: 'root'})
export class ProductService {
    productChanged = new Subject<Product []>()
    products: Product[];

    private url = 'https://prj11web-default-rtdb.firebaseio.com';

    constructor(private http: HttpClient){ }
 
    updateProduct(products: Product []){
        return this.http
            .put(`${this.url}/products.json`, products)
    }

    fetchProducts(){
        let observer =  this.http.get<Product[]>(`${this.url}/products.json`)
        .pipe(
            map(products => {
                return products && products.map(product => {
                    return product;
                });
            }),
            tap(products => {
                this.products = products;
                this.productChanged.next(products);
            }), 
        )
        return observer;
    }

    getProductById(id: string){
            return this.products[id];
    }

    getProductsBySupplier(supplier: Supplier): Observable <Product[]>{
     return this.fetchProducts().pipe(
                        map(products => {
                            return products.filter(product => {
                            if(product.supplier && product.supplier.email === supplier.email){
                                    return product;
                            }
                        })
                    })
                )

    }

    deleteProduct(index: number){
        this.products.splice(index, 1);
        this.updateProduct(this.products).subscribe(suppliers => {
            this.productChanged.next(this.products.slice());
        })
    }
}