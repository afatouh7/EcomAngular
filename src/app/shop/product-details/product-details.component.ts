import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { IProducts } from 'src/app/shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit  {
product:IProducts;
constructor(private shopService:ShopService, private activatedRoute:ActivatedRoute,private bcService:BreadcrumbService){
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

}
