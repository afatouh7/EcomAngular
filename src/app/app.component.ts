import { Component, OnInit } from '@angular/core';
import { IProducts } from './shared/models/product';
import { ShopService } from './shop/shop.service';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ecom';
  constructor(private basketService: BasketService, private accountService: AccountService) {

  }

  ngOnInit(): void {
    this.leadCurrentUSer();
   this.loadBasket();
  }
  loadBasket(){
    const basketid= localStorage.getItem('basket_id');
    if(basketid){
      this.basketService.getBasket(basketid).subscribe({
        next:()=>{console.log('intialBasket');
        error:(err)=>{console.log(err)}
        }

      })
    }

  }

  leadCurrentUSer(){
    const token = localStorage.getItem('token');
    //if(token){
      this.accountService.loadCurrentUser(token).subscribe({
        next:()=>{console.log('loadded succeffuly');
        error:(err)=>{console.log(err);
        }
        }
      })
    //}
  }
}
