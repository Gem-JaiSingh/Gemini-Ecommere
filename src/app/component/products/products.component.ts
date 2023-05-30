import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/Service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 public productList:any
  searchKey:string = "";
  constructor(public api :ApiService , public spinner:NgxSpinnerService , public cart:CartService , public route:Router) { }

  ngOnInit(): void {
    this.spinner.show();
  this.api.getProduct()
  .subscribe(res=>{
    this.productList = res;
    this.productList.forEach((a: any) => {
      Object.assign(a,{quantity:1 , price:a.price})
    });
  })
  
  this.cart.search.subscribe((val:any)=>{
    this.searchKey = val;
  })
  this.spinner.hide();
  }

  addtocart(item: any){
    this.cart.addtoCart(item);
  }

  // details(item:any){
    
  //   this.route.navigate(['/details'])
  // }
}
