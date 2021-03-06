import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { emailPadraoValidator } from 'src/app/compartilhado/validators/email-validator/emailPadrao.validator';
import { comparaSenha } from '../validator/comparaSenha/comparaSenha.validator';
import { SignupService } from '../service/signup.service';
import { NewUser } from '../interface/new-user';
import * as environment from '../../../environments/environment.js';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  landingPage=environment.landingpageUrl;
  signupForm: FormGroup;
  exibeSeExisteEmail: boolean = false;

  constructor(
    private fromBuilder: FormBuilder,
    private signupService: SignupService,
    private router: Router,
   
    ) { }

  ngOnInit() {
    this.signupForm = this.fromBuilder.group({
      email:["",
      [
        Validators.required,
        emailPadraoValidator
      ],
      
    ],
      name:["",
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60)
      ]
    ],
      password:["",
      [
        Validators.required
      ]
    ],
      confPassword:["",
      [
        Validators.required
      ]
    ]

    },{validator: comparaSenha});
  }

  enviar() {
    const newUser:NewUser = this.signupForm.getRawValue() as NewUser;
    const wk = newUser.email.split("@");
    console.log(wk);
    
    newUser.wakanderCode = wk[0];
    //console.log(newUser);
    this.signupService
      .register(newUser)
      .subscribe(
        (res)=>{
          if(res){
            this.router.navigate(["login"]);
            // this.exibeSeExisteEmail = false;
          }else{
            this.exibeSeExisteEmail = true;
            this.signupForm.controls["email"].reset("");
          }
      }, err => {
        console.log(err);
        this.signupForm.reset();
        this.signupForm.controls["email"].reset("");
        alert('algo deu errado, tente novamente');
      })
  }

  removeMensagem() {
    this.exibeSeExisteEmail = false;
  }
}
