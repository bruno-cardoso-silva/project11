import { Component, OnInit } from '@angular/core';
import { Supplier } from '../supplier.model';
import { SupplierService } from '../supplier.service';
import { faTruck, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  faTruck = faTruck;
  faPlusSquare = faPlusSquare;
  suppliers: Supplier[];

  constructor(private supplierSvc: SupplierService,
              private router: Router, 
              private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
   
    this.supplierSvc.fetchSuppliers()
      .subscribe(suppliers =>  {
          this.suppliers  = suppliers;
      });
  }

  onNewButtonClicked(){
    this.router.navigate(['new'], {relativeTo: this.activatedRouter});
  }

}
