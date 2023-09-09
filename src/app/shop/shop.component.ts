import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { Icategory } from '../shared/models/Category';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
@ViewChild('search') searchTerm:ElementRef;
  cateogries:Icategory[];
  public products = [];
  totalCount:number;
shopParams= new ShopParams();
  sortOptions=[
    {name:'Name',value:'Name'},
    {name:'Price: Max-Min',value:'PriceDesc'},
    {name:'Price: Min-Max',value:'PriceAsc'},

  ]
constructor(private shopService :ShopService){}


  ngOnInit(): void {
  this.getProducts();
  this.getCategories();
  }
  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe(res=>{
      this.products= res.data;
      this.totalCount=res.count;
      this.shopParams.pageNumber=res.pageNumber;
      this.shopParams.pageSize=res.pageSize;
    })
  }

  getCategories(){
    this.shopService.getCategories().subscribe(res=>{
      this.cateogries  = [{id:0,name:'All',description:''},...res];
  })
}

OneCategorySelect(categoryId:number){
  this.shopParams.categoryId=categoryId;
  this.shopParams.pageNumber=1;
  this.getProducts()

}
onsortSelect(sort:Event){
  let sortValue=(sort.target as HTMLInputElement).value;
  this.shopParams.sort=sortValue;
  this.getProducts();
}
OnPageChange(event:any){
  if(this.shopParams.pageNumber !== event){
    this.shopParams.pageNumber=event;
    this.getProducts();
  }

}
onSearch(){
this.shopParams.search=this.searchTerm.nativeElement.value;
this.getProducts();

}

onReset(){
  this.searchTerm.nativeElement.value='';
  this.shopParams= new ShopParams();
  this.getProducts();
}
}
