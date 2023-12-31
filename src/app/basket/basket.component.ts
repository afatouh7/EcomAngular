import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket.service';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket$:Observable<IBasket>;
  constructor(private basketService: BasketService){}
ngOnInit(): void {
this.basket$=this.basketService.basket$;
}

incrementBasketItemQuantity(item: IBasketItem){
  this.basketService.increamentBasketItemQuantity(item);
}
decrementBasketItemQuantity(item: IBasketItem){
  this.basketService.decreamentBasketItemQuantity(item);
}

removeBasketitem(item :IBasketItem){
this.basketService.removeItemFromBasket(item)
}

}
