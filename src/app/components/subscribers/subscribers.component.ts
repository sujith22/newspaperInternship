import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AdminDetailsInterface } from '../../models/adminDetails-interface';
import { SubscriberInterface } from '../../models/subscribers-interface';
import { Observable } from 'rxjs';
import { AuthLoginService } from '../../services/auth-login.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SubscriberDialog } from './subscriber-dialog';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {
  aadhar:string;
  address:string
  
  email:string;
  
  subID:number;
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
SubColl:AngularFirestoreCollection<SubscriberInterface>
SubObs:Observable<SubscriberInterface[]>

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
        
        this.SubColl=this.afs.collection<SubscriberInterface>('branches/'+this.Admin.branch+"/subscribers")
         
        this.SubObs=this.SubColl.valueChanges()
        
        
      }
      else{
        if(this.Admin.superAdmin==true || this.Admin.md==true){
          
        this.SubColl=this.afs.collection<SubscriberInterface>('branches/'+loadedBranch+"/subscribers")
         
        this.SubObs=this.SubColl.valueChanges()
        }
        else{
          this.accessDenied =true;
          
        }
      }
     
   
    },err=>{})
    
  })

  },err=>{})  
}


moreDetails(employee:SubscriberInterface){
  let branch={branch:this.branch,branchAdmin:this.branchAdmin}
  let data=Object.assign({},employee,branch)
  this.dialog.open(SubscriberDialog,{
        width:'300px;',
        data: data
      }) 
} 

addSubscriber(){
var a = Math.ceil(Math.random() * 9) + '';
  var b = Math.ceil(Math.random() * 9) + '';
  var c = Math.ceil(Math.random() * 9) + '';
  var d = Math.ceil(Math.random() * 9) + '';
  var z =a + ' ' + b + ' ' + ' ' + c + ' ' + d;
  this.subID=this.removeSpaces(z);
  this.viewForm=!this.viewForm;
}
removeSpaces(string) {
return string.split(' ').join('');
}
subscriberADD(){
 let obj={'aadhar':this.aadhar,
  'address':this.address,
  
  'email':this.email,
 
  'subID':this.subID,
  'name':this.name,
  'phone':this.phone}
  this.SubColl.doc(this.email).set(obj)
 this.viewForm=!this.viewForm;
 this.aadhar="";
  this.address="";
  this.email="";
  this.name="";
  this.phone="";

}
}
