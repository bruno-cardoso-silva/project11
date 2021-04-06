import { Component, OnInit } from '@angular/core';
import { Supplier } from './supplier.model';
import { SupplierService } from './supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  constructor(private supplierSvc: SupplierService) { }

  ngOnInit(): void {
  }

}
