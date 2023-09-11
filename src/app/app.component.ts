import { Component, OnInit } from '@angular/core';
import { IProducts } from './shared/models/product';
import { ShopService } from './shop/shop.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ecom';
  constructor(private basketService: BasketService) {

  }

  ngOnInit(): void {
    const basketid= localStorage.getItem('basket_id');
    if(basketid){
      this.basketService.getBasket(basketid).subscribe({
        next:()=>{console.log('intialBasket');
        error:(err)=>{console.log(err)}
        }

      })
    }

  }
}
