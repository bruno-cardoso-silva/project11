import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { faTruck, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  faPlusSquare= faPlusSquare;
  products: Product[];

  constructor(private productSvc: ProductService,
    private router: Router, 
    private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
      this.productSvc.productChanged.subscribe(products => {
        this.products = products;
      })
      this.productSvc.fetchProducts().subscribe();
  }

  onNewButtonClicked(){
    this.router.navigate(['new'], {relativeTo: this.activatedRouter});
  }

}
