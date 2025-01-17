import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import {cart,priceSummary} from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cartData:cart[] | undefined;
  productSummary:priceSummary={
    price:0,
    discount:0,
    delivery:0,
    tax:0,
    total:0,
}
constructor(private product:ProductService, private router:Router){

}
ngOnInit():void{
  this.product.cartPage().subscribe((data)=>{
    console.warn(data);
    this.cartData = data;
    let price=0;
    data.forEach((item)=>{
      if(item.quantity){
      price = price+ (+item.price* +item.quantity);
      }
    })
    this.productSummary.price = price;
    this.productSummary.discount = price/10;
    this.productSummary.tax=price/10;
    this.productSummary.delivery=100;
    this.productSummary.total = price+(price/10)+100-(price/10);

  })
}
proceedtoCheckout(){
    this.router.navigate(['/checkout']);
}
}
