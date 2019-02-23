import { Component, OnInit } from '@angular/core';
import { AuthLoginService } from '../../services/auth-login.service';
import { Router } from '@angular/router';
import { AdminDetailsInterface } from '../../models/adminDetails-interface';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userEmail:string="";
  password:string="";
  captcha:string="";
  captchaInput:string="";
  captchaNotMatch:boolean=false;
  invalidDetails:boolean=false;
  error:string
  AdminDoc: AngularFirestoreDocument<AdminDetailsInterface>;
  Admin: AdminDetailsInterface;
  createCaptcha(){
    var a = Math.ceil(Math.random() * 9) + '';
    var b = Math.ceil(Math.random() * 9) + '';
    var c = Math.ceil(Math.random() * 9) + '';
    var d = Math.ceil(Math.random() * 9) + '';
    var e = Math.ceil(Math.random() * 9) + '';
    var f = Math.ceil(Math.random() * 9) + '';
    var g = Math.ceil(Math.random() * 9) + '';
    this.captcha = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
  }
  removeSpaces(string) {
    return string.split(' ').join('');
  }
  login(){
    let s1=this.removeSpaces(this.captcha);
    if(s1==this.captchaInput)
    {
      this.authLogin.login(this.userEmail,this.password)
      .then((res)=>{
        this.authLogin.getAuth().subscribe(auth=>{
            let loggedInUser=auth.email
          
          
          this.AdminDoc = this.afs.doc<AdminDetailsInterface>('admins/'+loggedInUser);
        this.AdminDoc.valueChanges().subscribe(item =>{
          let branch = item.branch;
          this.router.navigate(['dashboard/'+branch])

          },err=>{})
        },err=>{})
      })
      .catch((err)=>{
          this.error=err
          this.invalidDetails=true;
          setTimeout(()=>{
            this.invalidDetails=false;
          },5000);
          this.router.navigate(['/login'])
      });

    }
    else{
      this.captchaNotMatch=true;
      setTimeout(()=>{
        this.captchaNotMatch=false;
      },3000);
    }
  }
  constructor(private authLogin:AuthLoginService,private router:Router,private afs: AngularFirestore){

   }

  forgotPassword(){
   this.router.navigate(['/forgot'])
  }

  ngOnInit() {
    this.createCaptcha()
  }

}
