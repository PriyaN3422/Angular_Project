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
  productQuantity:number=1;
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) {}

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getAProduct(productId).subscribe((data) => {
      this.productData = data;
    });
  }

  handleQuantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1;
    }
    else if(this.productQuantity>1 && val==='min'){
      this.productQuantity-=1;
    }
  }
}
