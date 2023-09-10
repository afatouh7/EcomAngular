import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.baseUrl;
  validationError:any;
constructor(private http:HttpClient){}
  ngOnInit(): void {

  }


  get404Error(){
    this.http.get(this.baseUrl+'product/989').subscribe(res=>{
      console.log(res);

    },err=>{
      console.log(err);

    })
  }

  get400Error(){
    this.http.get(this.baseUrl+'Bug/bad-request').subscribe(res=>{
      console.log(res);

    },err=>{
      console.log(err);

    })
  }

  get500Error(){
    this.http.get(this.baseUrl+'Bug/servier-error').subscribe(res=>{
      console.log(res);

    },err=>{
      console.log(err);

    })
  }

  get400ValidationError(){
    this.http.get(this.baseUrl+'Bug/bad-request/three').subscribe(res=>{
      console.log(res);

    },err=>{
      this.validationError= err.errors;

    })
  }


}
