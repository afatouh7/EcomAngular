import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/pagination';
import { Icategory } from '../shared/models/Category';
import { Observable, map } from 'rxjs';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "https://localhost:44391/api/";

  constructor(private http:HttpClient) { }

  getProducts(shopParams:ShopParams) {
    let params=new HttpParams();
    if(shopParams.categoryId !==0){
    params=  params.append('CategoryId',shopParams.categoryId.toString());
    }
    if(shopParams.search){
      params=   params.append("search", shopParams.search);
    }
    if(shopParams.sort){
      params=params.append('Sort',shopParams.sort)
    }
   params=params.append('pageNumber',shopParams.pageNumber.toString());
   params=params.append('pageSize',shopParams.pageSize.toString());


    return this.http.get<IPagination>(this.baseUrl + 'Products/get-all-products',{observe:'response',params})
    .pipe(
      map(response=>{
        return response.body;
      })
    )
  }
  getCategories(){
    return this.http.get<Icategory[]>(this.baseUrl+ 'Categories/get-all-categories');
  }
}
