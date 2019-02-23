import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthLoginService } from '../../services/auth-login.service';
import { Router } from '@angular/router';
import { AdminDetailsInterface } from '../../models/adminDetails-interface';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-components/navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn:boolean;
  loggedInUser:string;
  AdminDoc: AngularFirestoreDocument<AdminDetailsInterface>;
  Admin: AdminDetailsInterface;
  dis:boolean=false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  offices:string[]=['kochi','kottayam','kannur','thrissur','thiruvananthapuram','kozhikode','bengaluru'];
  // reports:string[]=['State Wise Report','District Wise Report','Annual Reports'];
  filters=[{value:'offices',viewValue:'Offices'},
                  {viewValue:'Employees',value:'employees'}
                  ,{viewValue:'Agencies',value:'agencies'},{viewValue:'Reports',value:'reports'}]
  MenuItem="Filter"
  menuClick(selected){
    this.MenuItem=(selected.target.innerText)
  } 
m
  logout(){
    this.authLogin.logout();
    this.router.navigate(['/login'])
  }

  officeClick(office:string){
    this.router.navigate(['/dashboard',office],)
  }
    
  constructor(private breakpointObserver: BreakpointObserver,private authLogin:AuthLoginService,private router:Router,private afs:AngularFirestore) {}
  
  ngOnInit(){
    this.authLogin.getAuth().subscribe(auth=>{
      if(auth){
        this.isLoggedIn=true;
        this.loggedInUser=auth.email
        this.AdminDoc = this.afs.doc<AdminDetailsInterface>('admins/'+this.loggedInUser);
          this.AdminDoc.valueChanges().subscribe(item =>{
          if(item.md==true || item.superAdmin==true){
            this.dis=true
          }

    })
      }
      else{
        this.isLoggedIn=false;

      }
      
  },err=>{})
  }
}
