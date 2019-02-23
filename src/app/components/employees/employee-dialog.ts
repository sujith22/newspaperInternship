import { Component,Inject, OnInit } from "@angular/core";
import{MAT_DIALOG_DATA} from "@angular/material";

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from "angularfire2/firestore";
import { AuthLoginService } from "../../services/auth-login.service";
import { AdminDetailsInterface } from "../../models/adminDetails-interface";
import { EmployeesInterface } from "../../models/employee-interface";
import { Observable } from "rxjs";
import { Router, ActivatedRoute, Params } from "@angular/router";


@Component({
    selector:'app-view-employee-details',
    templateUrl:'./employee-dialog.html'
})
export class EmployeeDialog implements OnInit{
    dess =[{value:'Manager',viewValue:'Manager'},
                {value:'Supervisor', viewValue:'Supervisor'},
                {value:'Asst. Manager', viewValue:'Asst. Manager'},
                {value:'Branch Admin', viewValue:'Branch Admin'}
              ];
              bgs=[{value:'O+',viewValue:'O+'},
              {value:'O-',viewValue:'O-'},
              {value:'A+',viewValue:'A+'},
              {value:'A-',viewValue:'A-'},
              {value:'B+',viewValue:'B+'},
              {value:'B-',viewValue:'B-'},
              {value:'AB+',viewValue:'AB+'},
              {value:'AB-',viewValue:'AB-'}
            ];

    enabler:boolean=true;
    branch:string;
    loggedInUser:string;
  isLoggedIn:boolean;

  AdminDoc: AngularFirestoreDocument<AdminDetailsInterface>;
  Admin: AdminDetailsInterface;
  // Employee
  EmpColl:AngularFirestoreCollection<EmployeesInterface>
  EmpObs:Observable<EmployeesInterface[]>
    constructor(@Inject(MAT_DIALOG_DATA) public empData:any,private afs: AngularFirestore, private authLogin:AuthLoginService
    ,private route:ActivatedRoute,
    private router:Router
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
          
        this.EmpColl=this.afs.collection<EmployeesInterface>('branches/'+this.empData.branch+"/employees")
         
        this.EmpObs=this.EmpColl.valueChanges()
    
  }, err=>{ })
             
    
}
    updateEmp(){

           
        this.EmpColl.doc(this.empData.email).set({
            'aadhar':this.empData.aadhar,
            'address':this.empData.address,
            'bloodGroup':this.empData.bloodGroup,
            'email':this.empData.email,
            'designation':this.empData.designation,
            'empID':this.empData.empID,
            'name':this.empData.name,
            'phone':this.empData.phone
        });

    }
}