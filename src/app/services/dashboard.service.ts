import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AdminDetailsInterface } from '../models/adminDetails-interface';
import { Observable, Subscription } from 'rxjs';
import { EmployeesInterface } from '../models/employee-interface';
import { AuthLoginService } from './auth-login.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService implements OnInit{
  subscription:Subscription[]
  loggedInUser:string;
  isLoggedIn:boolean;
  // Admin
  AdminDoc: AngularFirestoreDocument<AdminDetailsInterface>;
  Admin: AdminDetailsInterface;
  // Employee
  EmpColl:AngularFirestoreCollection<EmployeesInterface>
  EmpObs:Observable<EmployeesInterface[]>

 

  constructor(private afs: AngularFirestore, private authLogin:AuthLoginService) {

   }
   ngOnInit(){   
     this.authLogin.getAuth().subscribe(auth=>{
        if(auth){
          this.isLoggedIn=true;
          this.loggedInUser=auth.email
        }
        else{
          this.isLoggedIn=false;
  
        }})
   }

   employeeInt(){

   
    
   }

   employeeIntBranch(branch:string){
    this.EmpColl=this.afs.collection<EmployeesInterface>('branches/'+branch)
    return( this.EmpColl.valueChanges())
   }

   

  
}
