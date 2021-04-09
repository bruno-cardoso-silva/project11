import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  id: number;
  faEdit = faEdit;

  constructor(private route: ActivatedRoute, private router: Router, private prodSvc: ProductService) { }

  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.product = this.prodSvc.getProductById(""+this.id);
    })
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo: this.route});    
  }
}
