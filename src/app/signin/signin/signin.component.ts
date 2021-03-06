import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from '../service/login-service/login-service.service';
import { emailPadraoValidator } from 'src/app/compartilhado/validators/email-validator/emailPadrao.validator';

import * as environment from '../../../environments/environment.js';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  landingPage = environment.landingpageUrl;
  loginForm: FormGroup;
  fromUrl:string;

  @ViewChild("InputEmail") inputEmail: ElementRef<HTMLInputElement>

  constructor(
    private formbuilder:FormBuilder,
    private router:Router,
    private loginService: LoginService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.fromUrl = params.fromUrl;
  })

    this.loginForm = this.formbuilder.group({
      email: ["", 
        [
          Validators.required,
          emailPadraoValidator
        ]
      ],
      senha: ["", 
        [
          Validators.required
        ]
      ]
    });
  }

  login() {
    this.loginService.login(
      this.loginForm.get("email").value, 
      this.loginForm.get("senha").value)
    .subscribe(() => {
      console.log('redirecionando home');
      if(this.fromUrl){                 
        this.router.navigateByUrl(this.fromUrl);
      }else{
        this.router.navigateByUrl("");
      }
    }, err => {
      console.log(err);
      this.loginForm.reset();
      this.inputEmail.nativeElement.focus();
      alert('algo deu errado, tente novamente');
    });
  }

}
