import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { IProducts } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl= environment.baseUrl;
  private basketSource= new BehaviorSubject<IBasket>(null);
  basket$= this.basketSource.asObservable();

  private baskerTotalSource=new BehaviorSubject<IBasketTotals>(null);
  basketTotal$=this.baskerTotalSource.asObservable();

  constructor(private http:HttpClient) { }

  decreamentBasketItemQuantity(item:IBasketItem){
    const basket= this.getCurrentBasetValue();
    const itemIndex= basket.basketItems.findIndex(x=>x.id==item.id);
    basket.basketItems[itemIndex].quantity++;
    this.setBasket(basket);
  }
  
  increamentBasketItemQuantity(item:IBasketItem){
    const basket= this.getCurrentBasetValue();
    const itemIndex= basket.basketItems.findIndex(x=>x.id==item.id);
   if(basket.basketItems[itemIndex].quantity>1){
    basket.basketItems[itemIndex].quantity--;
    this.setBasket(basket);
   }
   else{
    this.removeItemFromBasket(item)
   }


  }
  removeItemFromBasket(item: IBasketItem) {
     const basket= this.getCurrentBasetValue();
     if(basket.basketItems.some(x=>x.id== item.id)){
      basket.basketItems=basket.basketItems.filter(x=>x.id !==item.id);
      if(basket.basketItems.length>0){
        this.setBasket(basket);
      }else{
        this.deleteBasket(basket);
      }
     }
  }
  deleteBasket(basket: IBasket) {
     return this.http.delete(this.baseUrl+'Basket/delete-basket-item/'+basket.id).subscribe({
      next:()=>{
        this.basketSource.next(null);
        this.baskerTotalSource.next(null);
        localStorage.removeItem('basket_id');
      },
      error(err){

        console.log(err);
      },
     });
  }



private calculateTotal(){
  const basket= this.getCurrentBasetValue();
  const shipping=0;
  const subtotal= basket.basketItems.reduce((a,c)=>{
    return  (c.price*c.quantity )+a;

  },0);
  const total=shipping +subtotal;
  this.baskerTotalSource.next({shipping,subtotal,total});
}

getBasket(basketId :string){
 return this.http.get(this.baseUrl+ 'Basket/get-basket-item/'+basketId)
  .pipe(
    map((basket:IBasket)=>{
      this.basketSource.next(basket);
      this.calculateTotal();
    })
  )
}

setBasket(basket:IBasket){
 return  this.http.post(this.baseUrl+'Basket/update-basket',basket).subscribe((res:IBasket)=>{
 next:(res:IBasket)=>{
  this.basketSource.next(res);
  this.calculateTotal();
 // console.log(res);
 }
 },err=>{
  console.log(err);

 });
}

getCurrentBasetValue(){
  return this.basketSource.value;
}


addItemToBasket(item:IProducts,quantity:number=1){
  const itemToAdd:IBasketItem= this.mapProductItemTOBasketItem(item,quantity);
  const  basket= this.getCurrentBasetValue() ?? this.createBasket()
  basket.basketItems= this.addOrUpdate(basket.basketItems,itemToAdd,quantity)
  return this.setBasket(basket);
}


private  addOrUpdate(BasketItems: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
   const index= BasketItems.findIndex(i=>i.id ===itemToAdd.id);
   if(index ===-1){
    itemToAdd.quantity=quantity;
    BasketItems.push(itemToAdd);
   }
   else{
    BasketItems[index].quantity+=quantity;
   }
   return BasketItems;
  }

 private createBasket(): IBasket {
    const basket= new Basket();
    localStorage.setItem('basket_id',basket.id);
    return basket;
  }

  private mapProductItemTOBasketItem(item: IProducts, quantity: number): IBasketItem {
    return {
      id:item.id,
      productName:item.name,
      price:item.price,
      productPicture:item.productPicture,
      category:item.categoryName,
      quantity:quantity

    }
  }

}
