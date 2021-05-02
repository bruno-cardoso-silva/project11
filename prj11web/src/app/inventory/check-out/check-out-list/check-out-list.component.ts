import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrashAlt, faPlusSquare, faEdit } from '@fortawesome/free-solid-svg-icons';
import { InventoryService } from '../../inventory.service';
import { InventoryOrder, InventoryTransactionType } from '../../item.model';

@Component({
  selector: 'app-check-out-list',
  templateUrl: './check-out-list.component.html',
  styleUrls: ['./check-out-list.component.css']
})
export class CheckOutListComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  inventoryList: InventoryOrder[];

  constructor(private inventoySvc: InventoryService ,
              private router: Router, 
              private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.inventoySvc.checkOutListChanged.subscribe(inventories => {
      this.inventoryList = inventories
    })
    this.inventoySvc.fetchItems().subscribe();
  }

  onNewButtonClicked(){
      this.router.navigate(['new'], {relativeTo: this.activatedRouter});
  }

}
