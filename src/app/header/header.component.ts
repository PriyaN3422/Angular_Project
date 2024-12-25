import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

menuType:string = 'default';
sellerName:string = "";
  constructor(private router:Router){}
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
}
