import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {product} from '../data-type';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
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
     
}
