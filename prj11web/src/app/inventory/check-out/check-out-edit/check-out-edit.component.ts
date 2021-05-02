import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/product/product.service';
import { SupplierService } from 'src/app/supplier/supplier.service';
import { InventoryService } from '../../inventory.service';
import { faTrashAlt, faPlusSquare, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Product, UnitType } from 'src/app/product/product.model';
import { Supplier } from 'src/app/supplier/supplier.model';
import { InventoryOrder, InventoryTransactionType, Item } from '../../item.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-check-out-edit',
  templateUrl: './check-out-edit.component.html',
  styleUrls: ['./check-out-edit.component.css']
})
export class CheckOutEditComponent implements OnInit {

  f: FormGroup;
  id: number;
  editMode= false;
  faTrashAlt=faTrashAlt;
  faPlusSquare=faPlusSquare;
  faEdit=faEdit;
  products: Product[];
  suppliers: Supplier[]; 
  selectedSupplier: Supplier;
  selectedProduct: Product;
  productForSearch: Product;
  items: Item[] = [];
  unTypes = Object.values(UnitType);
  inventoryOrder: InventoryOrder;
  maxQtd: number;
  error: string;

  constructor(private route: ActivatedRoute, private router: Router,
    private supplierSvc: SupplierService, 
    private productSvc: ProductService,
    private inventorySvc: InventoryService) { }

    ngOnInit(): void {

      this.supplierSvc.fetchSuppliers().subscribe(suppliers => {
          this.suppliers = suppliers;
      })
  
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm(this.id);
      })
    }
  
    initForm(id: number){
      if(this.editMode){
        this.inventoryOrder = this.inventorySvc.getInventoryById(id, InventoryTransactionType.OUT);
        this.items = this.inventoryOrder.items;
        this.getProductsBySupplier(this.inventoryOrder.supplier);
      }else{
        this.inventoryOrder = new InventoryOrder(null,null,new Date(), null, InventoryTransactionType.OUT);
      }
      
      this.f = new FormGroup({
        'code': new FormControl(null),
        'supplier': new FormControl(this.inventoryOrder.supplier, Validators.required),
        'dateTransc': new FormControl(formatDate(this.inventoryOrder.date, 'yyyy-MM-dd', 'en'), Validators.required),
        'transactionType': new FormControl(InventoryTransactionType.OUT),
        'item': new FormGroup({
          'product': new FormControl(this.products, Validators.required ),
          'qtd': new FormControl(null, Validators.required),
          'untType': new FormControl(null, Validators.required ),
          'buyPrice': new FormControl(null, Validators.required ),
          'sellPrice': new FormControl(null, Validators.required )
        })
      })
  
      this.selectedSupplier = this.inventoryOrder.supplier;
    }
  
    onCancel(){
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  
    onSaveClicked(){

      if(!this.inventorySvc.hasStock(this.items,
                                 this.selectedSupplier,
                                 this.productForSearch, 
                                 InventoryTransactionType.OUT)){
           this.error = `Not enouth stock. There are ${this.maxQtd} items  available for checking out.`                       
        return;
      }

      if(this.editMode){
        const inventory =  this.inventorySvc.checkOutList[this.id];
        inventory.date = this.f.value.dateTransc;
        inventory.items = this.items;
        inventory.notaFiscal = this.f.value.notaFiscal;
        inventory.supplier = this.f.value.supplier;
      }else{
         this.inventorySvc.checkOutList.push(new InventoryOrder(
          this.f.value.notaFiscal, 
          this.f.value.supplier, 
          this.f.value.dateTransc,
          this.items,
          InventoryTransactionType.OUT));
      }

      this.inventorySvc.updateInventoryCheckOut(this.inventorySvc.checkOutList.slice()).subscribe();
      this.onCancel();
    }
  
    onDelete(){
      this.inventorySvc.deleteCheckOut(this.id);
      this.router.navigate(['/inventory/out']);
    }
  
    onChange($event) {
      this.getProductsBySupplier(this.selectedSupplier);
    }
  
    onChangeProduct($event){
      this.productForSearch = this.selectedProduct;
      this.f.patchValue({item: {
          product: this.selectedProduct,
          qtd: this.selectedProduct.amount,
          untType: this.selectedProduct.unitType,
          buyPrice: this.selectedProduct.buyPrice, 
          sellPrice: this.selectedProduct.sellPrice 
      }})
      const itemsiN = this.inventorySvc.getItemsByProductAndSupplier(this.selectedSupplier, this.selectedProduct, InventoryTransactionType.IN);
      const itemsoUT = this.inventorySvc.getItemsByProductAndSupplier(this.selectedSupplier, this.selectedProduct, InventoryTransactionType.OUT);
      this.maxQtd = itemsiN.reduce((a,b) =>{ return a + b['qtd']}, 0) - itemsoUT.reduce((a,b) =>{ return a + b['qtd']}, 0);
    }
  
    onAddItem(){
      const newItem = new Item();
      newItem.product = this.f.value.item.product;
      newItem.qtd = this.f.value.item.qtd;
      newItem.un = this.f.value.item.untType;
      newItem.priceUn = this.f.value.item.buyPrice;
      newItem.product.sellPrice = this.f.value.item.sellPrice;
      newItem.product.buyPrice = this.f.value.item.buyPrice;
      this.items.push(newItem);    
      this.resetItemsForm()
      
    }
  
    resetItemsForm(){
        this.f.patchValue({item: {
          product: null,
          qtd: null,
          untType: null,
          buyPrice: null,
          sellPrice: null
        }})
    }
  
    removeItem(index: number){
      this.items.splice(index, 1);
    }
  
    editItem(index: number){
      const editableItem = this.items[index];
      this.removeItem(index);
      this.f.patchValue({item: {
              product: editableItem.product,
              qtd: editableItem.qtd,
              untType: editableItem.product.unitType,
              buyPrice: editableItem.product.buyPrice, 
              sellPrice: editableItem.product.sellPrice, 
          }})
  
    }
  
    compareSupplierFn(c1: any, c2:any): boolean {     
      return c1 && c2 ? c1.email === c2.email : c1 === c2; 
    }
  
    compareProductsFn(c1: any, c2:any): boolean {     
      return c1 && c2 ? c1.name === c2.name : c1 === c2; 
    }
  
    private getProductsBySupplier(supplier: Supplier){
      this.productSvc.getProductsBySupplier(supplier)
              .subscribe(products => {
                  this.products = products;
          })
    }
    
    onHandleError(){
      this.error = null;
    }

}
