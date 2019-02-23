import { Component,Inject, OnInit } from "@angular/core";
import{MAT_DIALOG_DATA} from "@angular/material";

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from "angularfire2/firestore";
import { AuthLoginService } from "../../services/auth-login.service";
import { AdminDetailsInterface } from "../../models/adminDetails-interface";

import { Observable } from "rxjs";
import { SubscriberInterface } from "../../models/subscribers-interface";


@Component({
    selector:'app-view-subscriber-details',
    templateUrl:'./subscriber-dialog.html'
})
export class SubscriberDialog implements OnInit{
   

    enabler:boolean=true;
    branch:string;
    loggedInUser:string;
  isLoggedIn:boolean;

  AdminDoc: AngularFirestoreDocument<AdminDetailsInterface>;
  Admin: AdminDetailsInterface;
  // Employee
  SubColl:AngularFirestoreCollection<SubscriberInterface>
  SubObs:Observable<SubscriberInterface[]>
    constructor(@Inject(MAT_DIALOG_DATA) public empData:any,private afs: AngularFirestore, private authLogin:AuthLoginService
       
        ){}

    enableON(){
        this.enabler=!this.enabler;
    }

    ngOnInit(){
        this.authLogin.getAuth().subscribe(auth=>{
            if(auth){
              this.isLoggedIn=true;
              this.loggedInUser=auth.email
            }
            else{
              this.isLoggedIn=false;
      
            }
            this.AdminDoc = this.afs.doc<AdminDetailsInterface>('admins/'+this.loggedInUser);
          this.AdminDoc.valueChanges().subscribe(item =>{
            this.Admin=item;
           
            this.SubColl=this.afs.collection<SubscriberInterface>('branches/'+this.Admin.branch+"/subscribers")
             
            this.SubObs=this.SubColl.valueChanges()
           
          },err=>{})
      
          },err=>{})  
    }
    
    updateSub(){
        this.SubColl.doc(this.empData.email).set({
            'aadhar':this.empData.aadhar,
            'address':this.empData.address,
            'email':this.empData.email,
            'subID':this.empData.subID,
            'name':this.empData.name,
            'phone':this.empData.phone
        });
        

    }
}