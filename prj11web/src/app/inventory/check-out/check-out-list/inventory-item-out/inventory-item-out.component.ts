import { Component, Input, OnInit } from '@angular/core';
import { InventoryOrder } from 'src/app/inventory/item.model';

@Component({
  selector: 'app-inventory-item-out',
  templateUrl: './inventory-item-out.component.html',
  styleUrls: ['./inventory-item-out.component.css']
})
export class InventoryItemOutComponent implements OnInit {

  @Input() inventory: InventoryOrder;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
