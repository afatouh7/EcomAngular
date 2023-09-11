import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';

const routes: Routes = [
  {path:'',component:HomeComponent,data:{breadcrumb:'Home'}},
  {path:'notfound',component:NotFoundComponent,data:{breadcrumb:'Not Found'}},
  {path:'servererror',component:ServerErrorComponent,data:{breadcrumb:'Server Error'}},

  {path:'shop',loadChildren:()=>import('./shop/shop.module').then(mo=>mo.ShopModule),data:{breadcrumb:'Shop'}},
  {path:'basket',loadChildren:()=>import('./basket/basket.module').then(mo=>mo.BasketModule),data:{breadcrumb:'basket'}},
  {path:'checkout',loadChildren:()=>import('./checkout/checkout.module').then(mo=>mo.CheckoutModule),data:{breadcrumb:'checkout'}},

  {path:'test-error',component:TestErrorComponent,data:{breadcrumb:'Test Error'}},
  {path:'**',redirectTo:'/notfound',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
