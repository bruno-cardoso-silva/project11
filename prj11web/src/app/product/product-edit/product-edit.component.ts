import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { SupplierService } from 'src/app/supplier/supplier.service';
import { Supplier } from 'src/app/supplier/supplier.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  f: FormGroup;
  id: number;
  editMode= false;
  product: Product;
  suppliers: Supplier[];

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private productSvc: ProductService,
              private supplierSvc: SupplierService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm(this.id+"");
        this.supplierSvc.fetchSuppliers()
                .subscribe(suppliers => {this.suppliers = suppliers});
    });    
  }

  initForm(id: string){
    if(this.editMode){
        this.product = this.productSvc.getProductById(id);
    }else{
       this.product = new Product(null,null,null,null,null,null);
    }

    this.f = new FormGroup({
        'name': new FormControl(this.product.name, Validators.required),
        'producerName': new FormControl(this.product.producerName, [Validators.required]),
        'price': new FormControl(this.product.price, Validators.required),
        'supplier': new FormControl(this.product.supplier, Validators.required),
        'unitType': new FormControl(this.product.unitType, Validators.required),
        'amount': new FormControl(this.product.amount, Validators.required)
    })
  }

  onCancel(){
      this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSaveClicked(){
    if(this.editMode){
      const product = this.productSvc.products[this.id]; 
      product.name = this.f.value.name; 
      product.producerName = this.f.value.producerName;
      product.price = this.f.value.price;
      product.supplier = this.f.value.supplier;
      product.unitType = this.f.value.unitType;
      product.amount = this.f.value.amount;
    }else{
      this.productSvc
        .products.push(new Product(this.f.value.name,
                                   this.f.value.producerName, 
                                   this.f.value.price,
                                   this.f.value.supplier,
                                   this.f.value.number,
                                   this.f.value.amount));
    }

    this.productSvc.updateProduct(this.productSvc.products.slice()).subscribe(products => {
        this.productSvc.productChanged.next(this.productSvc.products.slice());
        this.router.navigate(['../'], {relativeTo: this.route});

      });
  }

  onDelete(){
      this.productSvc.deleteProduct(this.id);
      this.router.navigate(['/product']);
  }
}
