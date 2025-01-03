import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import {product} from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResult : undefined | product[];
  constructor(private router:ActivatedRoute, private product:ProductService) {}
 
  ngOnInit() : void{
    let query = this.router.snapshot.paramMap.get('query');
    query && this.product.searchProduct(query).subscribe(result =>{
  this.searchResult = result;
    })
}
}
