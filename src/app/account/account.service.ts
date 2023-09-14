import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  basurl= environment.baseUrl;
  private currentUser= new ReplaySubject<IUser>(1);
  currentUSer$= this.currentUser.asObservable();

  constructor(private http:HttpClient,private router:Router) { }

  loadCurrentUser(token:string){
    if(token== null){
      this.currentUser.next(null);
      return of(null)
    }
  let headers= new HttpHeaders();
  headers =  headers.set('Authorization',`Bearer ${token}`);
  return this.http.get(this.basurl+'account/get-current-user',{headers}).pipe(
    map((user: IUser)=>{
      if(user){
        localStorage.setItem('token',user.token);
        this.currentUser.next(user);
      }
    })
  )
  }

  login(value: any) {
    return this.http.post(this.basurl + 'account/login', value).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUser.next(user);
        }
      })
    )
  }


  register(value:any){
    return this.http.post(this.basurl +'Account/Register',value).pipe(
      map((user: IUser)=>{
      if(user){
        localStorage.setItem('token',user.token);
        this.currentUser.next(user);
      }
    })
    )

  }

  logout(){
    localStorage.removeItem('token');
    this.currentUser.next(null);
    this.router.navigateByUrl('/')
  }

  checkEmailExist(email:string){
   return this.http.get(this.basurl+ 'Account/check-email-exist?email='+email);
  }
}
