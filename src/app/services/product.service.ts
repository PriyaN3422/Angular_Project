import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import {product, cart} from '../data-type';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | []> ();
  private apiUrl = 'http://localhost:3000/products';
  constructor(private http:HttpClient) { }

  addProduct(data:product){
    return this.http.post('http://localhost:3000/products',data);
  }
  getProduct(){
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  deleteProduct(id:string){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getAProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  updateProduct(product:product){
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`,product);
  }
  productImages(){
    return this.http.get<product[]>('http://localhost:3000/products/?_limit=3');
  }
  

  trendyProducts(): Observable<product[]> {
    return this.http.get<product[]>('http://localhost:3000/products/?_limit=8');
  }

  searchProduct(query: string): Observable<product[]> {
    return this.http.get<product[]>(this.apiUrl).pipe(
      map((products: product[]) => products.filter((product: product) => 
        Object.values(product).some((value: any) => 
          value.toString().toLowerCase().includes(query.toLowerCase())
        )
      ))
    );
  }

  addToCart(data:product){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.cartData.emit([data]);
    }
    else{
      console.warn('already have product');
      cartData = JSON.parse(localCart);
      cartData.push(data);
      console.warn('cartData' + JSON.stringify(cartData));
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeFromCart(id:string){
    let localCart = localStorage.getItem('localCart');
    if(localCart){
      let cartData = JSON.parse(localCart);
      cartData = cartData.filter((item:product) => item.id !== id);
      localStorage.setItem('localCart',JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  addCart(cartData:cart){
      return this.http.post('http://localhost:3000/cart',cartData);
  }

  getCartList(userId:string){
    return this.http.get<product[]>(`http://localhost:3000/cart?userId=${userId}`,{observe:'response'}).subscribe((result)=>{
      if(result && result.body){
         this.cartData.emit(result.body);
      }
    });
  }

  removeToCart(cartId:string){
    return this.http.delete('http://localhost:3000/cart/'+cartId);
  }
     
}
