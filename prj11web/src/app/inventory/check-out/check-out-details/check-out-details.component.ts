import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { InventoryService } from '../../inventory.service';
import { InventoryOrder, InventoryTransactionType } from '../../item.model';

@Component({
  selector: 'app-check-out-details',
  templateUrl: './check-out-details.component.html',
  styleUrls: ['./check-out-details.component.css']
})
export class CheckOutDetailsComponent implements OnInit {
  inventory: InventoryOrder;
  id: number;
  faEdit = faEdit;

  constructor(private route: ActivatedRoute, private router: Router, 
    private inventorySvc: InventoryService) { }

  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.inventory = this.inventorySvc.getInventoryById(this.id, InventoryTransactionType.OUT);
    })
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route});    
  }

}
