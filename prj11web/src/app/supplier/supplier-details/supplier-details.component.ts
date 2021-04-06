import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faEdit, faTruck } from '@fortawesome/free-solid-svg-icons';
import { Supplier } from '../supplier.model';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})
export class SupplierDetailsComponent implements OnInit {

  supplier: Supplier;
  id: number;
  faEdit = faEdit;
  faTruck = faTruck;

  constructor(private route: ActivatedRoute, private router: Router, private suppSvc: SupplierService) { }

  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.supplier = this.suppSvc.getSupplierById(""+this.id);
    })
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route});    
  }

}
