import { Component, Input, OnInit } from '@angular/core';
import { Supplier } from '../../supplier.model';
import { faTruck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-suppleir-item',
  templateUrl: './suppleir-item.component.html',
  styleUrls: ['./suppleir-item.component.css']
})
export class SuppleirItemComponent implements OnInit {

  @Input() supplier: Supplier;
  @Input() index: number;
  
  faTruck = faTruck;

  constructor() { }

  ngOnInit(): void {
  }

}
