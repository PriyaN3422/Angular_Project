import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import {product} from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  productDetails:undefined | product;
  updateMessage : undefined | string;
constructor(private route:ActivatedRoute, private product:ProductService){}

ngOnInit(): void{
  let productId = this.route.snapshot.paramMap.get('id');
  productId && this.product.getAProduct(productId).subscribe((result)=>{
    console.warn(result);
    this.productDetails = result
  })
}

submit(data:any){
 if(this.productDetails){
  data.id = this.productDetails.id;
 }
 this.product.updateProduct(data).subscribe((result)=>{
   if(result){
    this.updateMessage = "Product is updated";
   }
 })
 setTimeout(() => {
  this.updateMessage = undefined;
 }, 3000);
}
}
