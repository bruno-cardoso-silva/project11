import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Supplier } from '../supplier.model';
import { SupplierService } from '../supplier.service';
import { Address } from 'src/app/shared/cep.service';
import { faEdit, faSearchLocation } from '@fortawesome/free-solid-svg-icons';


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
  faSearchLocation = faSearchLocation;
  isSearchCEPDisabled: boolean = true;

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
    let name, email, cnpj, phone= '';    
    let address = new Address();

    if(this.editMode){
        this.supplier = this.supplierSvc.getSupplierById(id);
        name=  this.supplier.name;
        email=  this.supplier.email;
        cnpj=  this.supplier.cnpj;
        phone=  this.supplier.phone;
        if(this.supplier.address){
          address=  this.supplier.address
        }        
    }

    this.f = new FormGroup({
        'name': new FormControl(name,Validators.required),
        'email': new FormControl(email,[Validators.required, Validators.email]),
        'address': new FormGroup({
          'cep': new FormControl(address.cep,
                                 [Validators.required,
                                  Validators.minLength(8)]),
          'uf': new FormControl(address.uf),  
          'localidade': new FormControl(address.uf),  
          'bairro': new FormControl(address.bairro),
          'logradouro': new FormControl(address.logradouro),
          'numero': new FormControl(address.numero, Validators.required)                        
        }),
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
      this.supplierSvc.suppliers[this.id].cnpj = this.f.value.cnpj; 
      this.supplierSvc.suppliers[this.id].phone = this.f.value.phone;       
    }else{
      const supp = new Supplier(
        this.f.value.name, 
        this.f.value.email,
        this.f.value.cnpj,
        this.f.value.phone)
      supp.address = this.f.value.address; 
      this.supplierSvc.suppliers.push(supp)
    }
    this.supplierSvc.updateSuppliers(this.supplierSvc.suppliers).subscribe(suppliers => {
        this.supplierSvc.supplierChanged.next(this.supplierSvc.suppliers.slice());
        this.isLoading = false;
        this.onCancel();
      });
  }

  onDelete(){
      this.supplierSvc.deleteSupplier(this.id);
      this.router.navigate(['/supplier']);
  }

  onCepInputChanged($event: any){
        let cepInp = (<HTMLInputElement>event.target).value;
        if(cepInp && cepInp.length === 8){
            this.isSearchCEPDisabled= false;
        }else{
          this.isSearchCEPDisabled = true;
        }
  }

    searchCEP(){
        this.supplierSvc.getAddress(this.f.value.address.cep).subscribe(newAddress => {
          const {bairro, logradouro, localidade, uf} = newAddress; 
          this.f.patchValue({
                    address: {
                      bairro,
                      logradouro,
                      localidade,
                      uf
                    }            
                })
        }, err=> {
           alert('cep incorreto')
        })      
    }
}
