import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AdminDetailsInterface } from '../../models/adminDetails-interface';
import { AgenciesInterface } from '../../models/agecnies-interface';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AuthLoginService } from '../../services/auth-login.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AgencyDialog } from './agency-dialog';

@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.css']
})
export class AgenciesComponent implements OnInit {
  
  address:string;
    
  email:string;
  
  ageID:number;
  name:string;
  phone:string;
  dropPoint:string
  quantity:number;
  NOS:number;
superAdmin:boolean=false;
branchAdmin:boolean=false;
md:boolean=false;
viewForm:boolean=false;

loggedInUser:string;
isLoggedIn:boolean;

AdminDoc: AngularFirestoreDocument<AdminDetailsInterface>;
Admin: AdminDetailsInterface;
// Employee
AgeColl:AngularFirestoreCollection<AgenciesInterface>
AgeObs:Observable<AgenciesInterface[]>
// Meta data


branch:string
UID:number;


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
        
        this.AgeColl=this.afs.collection<AgenciesInterface>('branches/'+this.Admin.branch+"/agencies")
         
        this.AgeObs=this.AgeColl.valueChanges()
       
        
      }
      else{
        if(this.Admin.superAdmin==true || this.Admin.md==true){
          
        this.AgeColl=this.afs.collection<AgenciesInterface>('branches/'+loadedBranch+"/agencies")
         
        this.AgeObs=this.AgeColl.valueChanges()
        }
        else{
          this.accessDenied =true;
          
        }
      }
     
   
    }, err=>{ })
    
  })

  }, err=>{ })  
}


moreDetails(employee:AgenciesInterface){
  let branch={branch:this.branch,branchAdmin:this.branchAdmin}
  let data=Object.assign({},employee,branch)
  this.dialog.open(AgencyDialog,{
        width:'300px;',
        data: data
      }) 
} 

addAgency(){
var a = Math.ceil(Math.random() * 9) + '';
  var b = Math.ceil(Math.random() * 9) + '';
  var c = Math.ceil(Math.random() * 9) + '';
  var d = Math.ceil(Math.random() * 9) + '';
  var z =a + ' ' + b + ' ' + ' ' + c + ' ' + d;
  this.ageID=this.removeSpaces(z);
  this.viewForm=!this.viewForm;
}
removeSpaces(string) {
return string.split(' ').join('');
}
AgencyADD(){
 let obj={
  'address':this.address,
  'dropPoint':this.dropPoint,
  'email':this.email,
  'quantity':this.quantity,
  'NOS':this.NOS,
  'ageID':this.ageID,
  'name':this.name,
  'phone':this.phone}
  this.AgeColl.doc(this.email).set(obj)
 this.viewForm=!this.viewForm;
 
  this.address="";    
  this.email="";
    this.NOS=0; this.quantity=0; this.dropPoint='';
  this.name="";
  this.phone="";

}

}
