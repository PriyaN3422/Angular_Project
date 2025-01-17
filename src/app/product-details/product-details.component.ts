import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {product, cart} from '../data-type'
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productData: product | undefined;
  productQuantity:number=1;
  removeCart = false;
  cartdata:product|undefined;
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) {}

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getAProduct(productId).subscribe((data) => {
      this.productData = data;
      let cartData = localStorage.getItem('localCart');
      if(productId && cartData){
         let items = JSON.parse(cartData);
         items = items.filter((item:product) => item.id === productId);
         if(items.length){
         this.removeCart = true;
         
         }
         else{
          this.removeCart = false;
         }
        
      }
      let user = localStorage.getItem('user');
      if(user){
       let userId = JSON.parse(user).id;
       this.product.getCartList(userId);
       this.product.cartData.subscribe((data)=>{
         let item = data.filter((item:product) => item.productId?.toString() === productId?.toString());
         if(item.length){
           this.removeCart = true;
           this.cartdata = item[0];
         }
       })
      }
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

  addToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity
      if(!localStorage.getItem('user')){
        this.product.addToCart(this.productData);
        this.removeCart = true;
      }
      else{
        let user=localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData:cart = {...this.productData,productId:this.productData.id,userId};
        delete cartData.id;
        this.product.addCart(cartData).subscribe((data) => {
          if(data){
            this.product.getCartList(userId);
            this.removeCart = true;
          }
      })
    }
  }
}

  removeToCart(productId:string){
    if(!localStorage.getItem('user')){
     this.product.removeFromCart(productId);
     
    }
    else{
      console.log('remove'+this.cartdata);

     this.cartdata && this.product.removeToCart(this.cartdata.id).subscribe((data) => {
      if(data){
        console.log('removed');
      }
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      this.product.getCartList(userId);
     })
    }
    this.removeCart = false;
  }
}

