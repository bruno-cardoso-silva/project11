import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Supplier } from '../supplier.model';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent implements OnInit {
  f: FormGroup;
  id: number;
  editMode= false;
  isLoading=false;
  supplier: Supplier;

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private supplierSvc: SupplierService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm(this.id+"");
    });    
  }

  initForm(id: string){
    let name, email, address, cnpj, cep, phone = '';    
    if(this.editMode){
        this.supplier = this.supplierSvc.getSupplierById(id);
        name=  this.supplier.name;
        email=  this.supplier.email;
        address=  this.supplier.address;
        cep=  this.supplier.cep;
        cnpj=  this.supplier.cnpj;
        phone=  this.supplier.phone;      
    }

    this.f = new FormGroup({
        'name': new FormControl(name,Validators.required),
        'email': new FormControl(email,[Validators.required, Validators.email]),
        'address': new FormControl(address,Validators.required),
        'cep': new FormControl(cep,Validators.required),
        'cnpj': new FormControl(cnpj,Validators.required),
        'phone': new FormControl(phone,Validators.required)
    })
  }

  onCancel(){
      this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSaveClicked(){
    this.isLoading = true;
    if(this.editMode){
      this.supplierSvc.suppliers[this.id].name = this.f.value.name; 
      this.supplierSvc.suppliers[this.id].email = this.f.value.email; 
      this.supplierSvc.suppliers[this.id].address = this.f.value.address; 
      this.supplierSvc.suppliers[this.id].cep = this.f.value.cep; 
      this.supplierSvc.suppliers[this.id].cnpj = this.f.value.cnpj; 
      this.supplierSvc.suppliers[this.id].phone = this.f.value.phone;       
    }else{
      this.supplierSvc.suppliers.push(new Supplier(
        this.f.value.name, 
        this.f.value.email,
        this.f.value.address, 
        this.f.value.cep,
        this.f.value.cnpj,
        this.f.value.phone))
    }
    this.supplierSvc.updateSuppliers(this.supplierSvc.suppliers).subscribe(suppliers => {
        this.supplierSvc.supplierChanged.next(this.supplierSvc.suppliers.slice());
        this.isLoading = false;
    });
  }

  onDelete(){
      this.supplierSvc.deleteSupplier(this.id);
      this.router.navigate(['/supplier']);
  }
}
