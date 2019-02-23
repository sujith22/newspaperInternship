import { Component, OnInit } from '@angular/core';
import { AuthLoginService } from '../../services/auth-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email:string;
  view:boolean=false;
  constructor(private authlogin:AuthLoginService,private router:Router) { }

  ngOnInit() {
  }

  forgot(){
    this.authlogin.forgot_request(this.email)
    this.view=true;
    setTimeout(()=>{
      this.router.navigate(['/login'])
    },3000)
  }

}
