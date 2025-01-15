import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { signUp, login } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidEventEmitter = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private route:Router) {} // Use HttpClient instead of undefined
  
  signUp(data:signUp){
    this.http.post('http://localhost:3000/User',data,{observe:'response'}).subscribe((res)=>{
      if(res){
        localStorage.setItem('user',JSON.stringify(res.body));
        this.route.navigate(['/']);
      }
  })
}

userAuthReload(){
  if(localStorage.getItem('user')){
    this.route.navigate(['/']);
  }
}

login(data:login){
  this.http.get<signUp[]>(`http://localhost:3000/User?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((res)=>{
    if(res && res.body?.length){
      console.warn(res.body);
      localStorage.setItem('user',JSON.stringify(res.body[0]));
      this.route.navigate(['/']);
      this.invalidEventEmitter.emit(false);
    }
    else{
      this.invalidEventEmitter.emit(true);
    }
})
}
}
