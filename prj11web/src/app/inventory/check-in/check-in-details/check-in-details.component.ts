import { Component, OnInit } from '@angular/core';
import { InventoryOrder, InventoryTransactionType } from '../../item.model';
import { faTrashAlt, faPlusSquare, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InventoryService } from '../../inventory.service';

@Component({
  selector: 'app-check-in-details',
  templateUrl: './check-in-details.component.html',
  styleUrls: ['./check-in-details.component.css']
})
export class CheckInDetailsComponent implements OnInit {

  inventory: InventoryOrder;
  id: number;
  faEdit = faEdit;

  constructor(private route: ActivatedRoute, private router: Router, private inventorySvc: InventoryService) { }

  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.inventory = this.inventorySvc.getInventoryById(this.id, InventoryTransactionType.IN);
    })
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route});    
  }

}
