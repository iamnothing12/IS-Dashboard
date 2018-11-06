import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  passwordType: string = "password";
  passwordShown: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public togglePassword(){
      if(this.passwordShown){
        this.passwordShown = false;
        this.passwordType = 'password';
      }
      else{
        this.passwordShown = true;
        this.passwordType = 'text';
      }

  }
}
