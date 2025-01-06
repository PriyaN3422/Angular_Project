import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {product} from '../data-type'
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productData: product | undefined;

  constructor(private activeRoute: ActivatedRoute, private product: ProductService) {}

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getAProduct(productId).subscribe((data) => {
      this.productData = data;
    });
  }
}
