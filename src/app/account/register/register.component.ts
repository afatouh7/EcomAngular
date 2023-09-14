import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmPassowrd } from 'src/app/shared/Validators/password.validator';
import { EmailValidator } from 'src/app/shared/Validators/validateEmailNotToken.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm :FormGroup;

  constructor(private accountService:AccountService,private router:Router,private fb:FormBuilder,private emailValidator:EmailValidator){}
  ngOnInit(): void {
    this.createRegister();
    }

    errors:string[];
    createRegister(){
      this.registerForm=this.fb.group({
        displayName:['',[Validators.required,Validators.minLength(3)]],
        email: ['',[Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],[this.emailValidator.ValidateEmailNotToken()]],
        password: ['', Validators.required],
        confirmPassword:['',[Validators.required]]

      },{Validators:[ConfirmPassowrd]})
    }

    get _displayName(){
      return this.registerForm.get('displayName')
    }

    get _email(){
      return this.registerForm.get('email')
    }

    get _password(){
      return this.registerForm.get('password');
    }

    get _confirmPassword(){
      return this.registerForm.get('confirmPassword');
    }

    onSubmit(){
      this.accountService.register(this.registerForm.value).subscribe(
        {
          next:(()=>{this.router.navigateByUrl('/shop')}),
          error:((err)=>{this.errors= err.errors})
        }
      )
    }

}
