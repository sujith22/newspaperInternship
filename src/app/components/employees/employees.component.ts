import { Component, OnInit, Input } from '@angular/core';

import { EmployeesInterface } from '../../models/employee-interface';
import { AuthLoginService } from '../../services/auth-login.service';
import { AdminDetailsInterface } from '../../models/adminDetails-interface';
import { Observable } from 'rxjs';
import {MatDialog} from '@angular/material';
import { EmployeeDialog } from './employee-dialog';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
 
})
export class EmployeesComponent implements OnInit {
    aadhar:string;
    address:string
    bloodGroup:string;
    email:string;
    designation:string;
    empID:number;
    name:string;
    phone:string;
  superAdmin:boolean=false;
  branchAdmin:boolean=false;
  md:boolean=false;
  viewForm:boolean=false;

  loggedInUser:string;
  isLoggedIn:boolean;

  AdminDoc: AngularFirestoreDocument<AdminDetailsInterface>;
  Admin: AdminDetailsInterface;
  // Employee
  EmpColl:AngularFirestoreCollection<EmployeesInterface>
  EmpObs:Observable<EmployeesInterface[]>
  // Meta data
  metaColl:AngularFirestoreDocument<any>;
  meta:string="Address loading..."

  branch:string
  UID:number;
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

admin:AdminDetailsInterface
accessDenied:boolean=false;
  constructor(private dialog:MatDialog,private afs: AngularFirestore, private authLogin:AuthLoginService,private route:ActivatedRoute,
    private router:Router)
    {
    }

  ngOnInit() 
  {
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
      this.superAdmin=this.Admin.superAdmin;
      this.branchAdmin=this.Admin.branchAdmin;
      this.md=this.Admin.md
      this.route.params.subscribe((params:Params)=>{
        let loadedBranch=params.branch;
        if(loadedBranch==this.Admin.branch){
          
          this.EmpColl=this.afs.collection<EmployeesInterface>('branches/'+this.Admin.branch+"/employees")
           this.branch=this.Admin.branch
          this.EmpObs=this.EmpColl.valueChanges()
          this.afs.doc<any>('branches/'+this.Admin.branch)
          .valueChanges().subscribe(info=>{
            this.meta=info.address;
          }, err=>{ })
          
        }
        else{
          if(this.Admin.superAdmin==true || this.Admin.md==true){
            this.afs.doc<any>('branches/'+loadedBranch)
          .valueChanges().subscribe(info=>{
            this.meta=info.address;
          }, err=>{ })
          this.EmpColl=this.afs.collection<EmployeesInterface>('branches/'+loadedBranch+"/employees")
           this.branch=loadedBranch;
          this.EmpObs=this.EmpColl.valueChanges()
          }
          else{
            this.accessDenied =true;
            
          }
        }
       
     
      }, err=>{ })
      
    }, err=>{ })

    }, err=>{ })  
  }


  moreDetails(employee:EmployeesInterface){

    let branch={branch:this.branch,superAdmin:this.superAdmin}
    
    let data=Object.assign({},employee,branch)
    this.dialog.open(EmployeeDialog,{
          width:'300px;',
          data: data
        }) 
  } 

 addEmployee(){
  var a = Math.ceil(Math.random() * 9) + '';
    var b = Math.ceil(Math.random() * 9) + '';
    var c = Math.ceil(Math.random() * 9) + '';
    var d = Math.ceil(Math.random() * 9) + '';
    var z =a + ' ' + b + ' ' + ' ' + c + ' ' + d;
    this.empID=this.removeSpaces(z);
    this.viewForm=!this.viewForm;
 }
 removeSpaces(string) {
  return string.split(' ').join('');
}
 employeeADD(){
   let obj={'aadhar':this.aadhar,
    'address':this.address,
    'bloodGroup':this.bloodGroup,
    'email':this.email,
    'designation':this.designation,
    'empID':this.empID,
    'name':this.name,
    'phone':this.phone}
    this.EmpColl.doc(this.email).set(obj)
   this.viewForm=!this.viewForm;
   this.aadhar="";
    this.address="";    this.bloodGroup="";
    this.email="";
    this.designation="";
    this.name="";
    this.phone="";

 }
}
