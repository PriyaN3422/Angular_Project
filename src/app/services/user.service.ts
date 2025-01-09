import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { signUp } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private route:Router) {} // Use HttpClient instead of undefined
  
  signUp(data:signUp){
    this.http.post('http://localhost:3000/User',data,{observe:'response'}).subscribe((res)=>{
      if(res){
        localStorage.setItem('user',JSON.stringify(res.body));
        this.route.navigate(['/']);
      }
  })
}
}
