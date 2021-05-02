import { Component, Input, OnInit } from '@angular/core';
import { InventoryOrder } from 'src/app/inventory/item.model';

@Component({
  selector: 'app-inventory-item',
  templateUrl: './inventory-item.component.html',
  styleUrls: ['./inventory-item.component.css']
})
export class InventoryItemComponent implements OnInit {

  @Input() inventory: InventoryOrder;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }


}
