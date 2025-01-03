import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import {product} from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  popularProduct:undefined|product[];
  trendyProducts:undefined|product[];
constructor(private product:ProductService){}

ngOnInit():void{
  this.product.productImages().subscribe((result)=>{
    console.warn(result);
    this.popularProduct = result;
})

this.product.trendyProducts().subscribe((result)=>{
  this.trendyProducts = result;
})
}
}

