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
        else{
          this.menuType = 'default';
        }
      }
    })
  }

  logout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
}

searchProduct(query:KeyboardEvent){
  if(query){  
    const element = query.target as HTMLInputElement;
    console.log(element.value);
    this.product.searchProduct(element.value).subscribe((result)=>{
   
      console.warn(result);
      if(result.length>5){
        result.length = length;
      }
      this.productSearch = result;
  })
}
}

hideSearch(){
  this.productSearch = undefined;
}
}
