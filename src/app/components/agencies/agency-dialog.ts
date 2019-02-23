import { Component,Inject, OnInit } from "@angular/core";
import{MAT_DIALOG_DATA} from "@angular/material";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from "angularfire2/firestore";
import { AuthLoginService } from "../../services/auth-login.service";
import { AdminDetailsInterface } from "../../models/adminDetails-interface";

import { Observable } from "rxjs";
import { AgenciesInterface } from "../../models/agecnies-interface";


@Component({
    selector:'app-view-agency-details',
    templateUrl:'./agency-dialog.html'
})
export class AgencyDialog implements OnInit{
   

    enabler:boolean=true;
    branch:string;
    loggedInUser:string;
  isLoggedIn:boolean;

  AdminDoc: AngularFirestoreDocument<AdminDetailsInterface>;
  Admin: AdminDetailsInterface;
  // Employee
  AgeColl:AngularFirestoreCollection<AgenciesInterface>
  AgeObs:Observable<AgenciesInterface[]>
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
            
            this.AgeColl=this.afs.collection<AgenciesInterface>('branches/'+this.Admin.branch+"/agencies")
             
            this.AgeObs=this.AgeColl.valueChanges()
           
          })
      
          }, err=>{ })  
    }
    
    updateAge(){

          
        this.AgeColl.doc(this.empData.email).set({
            'dropPoint':this.empData.dropPoint,
            'address':this.empData.address,
            'quantity':this.empData.quantity,
            'email':this.empData.email,
            'NOS':this.empData.NOS,
            'ageID':this.empData.ageID,
            'name':this.empData.name,
            'phone':this.empData.phone
        });

    }
}