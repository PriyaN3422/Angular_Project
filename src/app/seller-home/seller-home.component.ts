import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{
productList: undefined | product[];
productMessage : undefined | string;
icon = faTrash;
iconEdit = faEdit;
 constructor(private product:ProductService){}

 ngOnInit(): void{
this.getItem();
}

deleteItem(id:string){
  this.product.deleteProduct(id).subscribe((result)=>{
    if(result){
     this.productMessage = "Product is deleted";
     this.getItem();
    }
  })
  setTimeout(() => {
    this.productMessage = undefined;
  }, 3000);
}

getItem(){
  this.product.getProduct().subscribe((result)=>{
    if(result){
      this.productList = result;
    }
 })
}
}
