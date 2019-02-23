import { Component, OnInit } from '@angular/core';
import { AuthLoginService } from '../../services/auth-login.service';
import { Router } from '@angular/router';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { AdminDetailsInterface } from '../../models/adminDetails-interface';
import { DashboardService } from '../../services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoggedIn:boolean;
  loggedInUser:string;
  branch:string
  ngOnInit() {
    this.authLogin.getAuth().subscribe(auth=>{
      if(auth){
        this.isLoggedIn=true;
        this.loggedInUser=auth.email
        
      }
      else{
        this.isLoggedIn=false;
        this.router.navigate(['/login'])
      }
    }, err=>{ })
    
  }

  constructor(private authLogin:AuthLoginService,private router:Router,private afs: AngularFirestore, private dashService:DashboardService
  ){ }

  redirect(){
    this.router.navigate(['/login'])
  }

 



}
