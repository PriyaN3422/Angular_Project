import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import {product} from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

menuType:string = 'default';
sellerName:string = "";
productSearch:undefined|product[];
userName:string = '';
cartItems = 0;
  constructor(private router:Router, private product:ProductService){}
  ngOnInit():void{
    this.router.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          let sellerStore = localStorage.getItem('seller');
          console.warn('sellerStore' + sellerStore);
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          console.warn('sellerData' + sellerData);
          this.sellerName = sellerData.name;
         this.menuType = 'seller';
        }
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
        }
        else{
          this.menuType = 'default';
        }
      }
    })
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }
    if(localStorage.getItem('user')){
    this.product.cartData.subscribe((items) =>{
      this.cartItems = items.length;
    })
  }
  }

  logout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
   
}

userLogout(){
  localStorage.removeItem('user');
  this.router.navigate(['/']);
  this.product.cartData.emit([]);
}

searchProduct(query:KeyboardEvent){
  if(query){  
    const element = query.target as HTMLInputElement;
    console.log(element.value);
    this.product.searchProduct(element.value).subscribe((result)=>{
   
      console.warn(result);
      if(result.length>5){
        result.length = 5;
      }
      this.productSearch = result;
  })
}
}

hideSearch(){
  this.productSearch = undefined;
}

submitSearch(val:string){
    this.router.navigate([`search/${val}`]);
}

navigateToProduct(id:string){
  console.warn(id);
  this.router.navigate([`product-details/${id}`]);
}
}
