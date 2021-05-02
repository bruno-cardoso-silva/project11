import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../inventory.service';
import { InventoryOrder, InventoryTransactionType } from '../../item.model';
import { faTrashAlt, faPlusSquare, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-check-in-list',
  templateUrl: './check-in-list.component.html',
  styleUrls: ['./check-in-list.component.css']
})
export class CheckInListComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  inventoryList: InventoryOrder[];

  constructor(private inventoySvc: InventoryService ,
              private router: Router, 
              private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.inventoySvc.checkInListChanged.subscribe(inventories => {
      this.inventoryList = inventories;
    })
    this.inventoySvc.fetchItems().subscribe();
  }

  onNewButtonClicked(){
      this.router.navigate(['new'], {relativeTo: this.activatedRouter});
  }
}
