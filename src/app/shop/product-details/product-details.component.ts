import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { IProducts } from 'src/app/shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit  {
product:IProducts;
quntity:number=1;
constructor(private shopService:ShopService, private activatedRoute:ActivatedRoute
  ,private bcService:BreadcrumbService, private basktservice:BasketService){
  this.bcService.set('@productDetails','');
}
  ngOnInit(): void {
   this.loadProduct();
  }

  loadProduct(){
    this.shopService.getProduct(parseFloat (this.activatedRoute.snapshot.paramMap.get('id'))).subscribe(res=>{
      this.product=res;
      this.bcService.set('@productDetails',res.name)

    });
  }


  addItemTobasket(){
    this.basktservice.addItemToBasket(this.product,this.quntity);
  }
  increamentQuentity(){
    this.quntity++;
  }
  decreamentQuentity(){
    if(this.quntity >1){
      this.quntity--;
    }

  }




}
