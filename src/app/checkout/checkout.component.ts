import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  totalPrice:number | undefined;
constructor(private product:ProductService){}

ngOnInit():void{
  this.product.cartPage().subscribe((data)=>{
    let price=0;
    data.forEach((item)=>{
      if(item.quantity){
      price = price+ (+item.price* +item.quantity);
      }
    })
    this.totalPrice = price+(price/10)+100-(price/10);

  })
}

orderNow(data:{email:string,address:string,contact:string}){
  let user = localStorage.getItem('user');
  let userId = user && JSON.parse(user).id;
  if(this.totalPrice){
    let orderData:order={
      ...data,
      totalprice:this.totalPrice,
      userId
    }
    this.product.orderNow(orderData).subscribe((data)=>{
      if(data){
        alert("Order placed");
      }
    })
  }
 
}
}
