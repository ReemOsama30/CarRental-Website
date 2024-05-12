import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { CommonModule } from '@angular/common';

@Component({
  
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,FormsModule,HttpClientModule,BrowserModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {
  

  constructor( private _AuthService:AuthService){}
  registerForm:FormGroup=new FormGroup({
  Name : new FormControl(null,[Validators.required,Validators.minLength(3)]),
  Email: new FormControl(null,[Validators.required,Validators.email]),
  PhoneNumber: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  UserName: new FormControl(null,[Validators.required,Validators.minLength(3)]),
  password: new FormControl(null,[Validators.required,Validators.pattern(/[A-Z][a-z0-9]{6,}/)]),
  rePassword: new FormControl(null,[Validators.required,Validators.pattern(/[A-Z][a-z0-9]{6,}/)]),
  Address: new FormControl(null,[Validators.required,Validators.minLength(3)]),
  Role: new FormControl("CUSTOMER")
  



  });
  handleForm():void{
    if(this.registerForm.valid){
    
    this._AuthService.setRegister(this.registerForm.value).subscribe({
      next:(response)=>{
        console.log(response)
      },
      error:(err)=>{
        console.log(err)

      }
    })
    }
  }
}
