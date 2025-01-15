import { Component } from '@angular/core';
import { login, product, signUp, cart } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin : boolean = true;
  authError : string = '';
  constructor(private user:UserService, private product:ProductService) {}

ngOnInit():void{
  this.user.userAuthReload();
}

  signup(data:signUp){
    this.user.signUp(data);
  }

 login(data:login){
   this.user.login(data);
   this.user.invalidEventEmitter.subscribe((res)=>{
    if(res){
     this.authError = 'User not found';
    }
    else{
      this.localCartToRemoteCart();
    }
   })
 }

  userLogin(){
    this.showLogin = true;
   
  }

  userSignup(){
    this.showLogin = false;
  }

  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(data){
      let cartDataList:product[] = JSON.parse(data);
      cartDataList.forEach((product:product,index)=>{
         let cartData:cart = {...product,productId:product.id,userId};
         delete cartData.id;
         setTimeout(()=>{
          this.product.addCart(cartData).subscribe((data)=>{
             if(data){
              console.warn("product is added to db");
             }
          })
      },500)
     if(cartDataList.length ===index+1){
      localStorage.removeItem('localCart');
     }
      })
    }
    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
    
  }
}
