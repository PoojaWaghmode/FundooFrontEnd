import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import{Router} from '@angular/router'
import {UserServiceService} from '../../Services/UserService/user-service.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  
  
  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
     media: MediaMatcher,
     private router:Router,
     private userService:UserServiceService) 
     {
          this.mobileQuery = media.matchMedia('(max-width: 600px)');
          this._mobileQueryListener = () => changeDetectorRef.detectChanges();
          this.mobileQuery.addListener(this._mobileQueryListener);
          
        
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener); 
  }

  uploadProfile(user)
    {
      // this.userService.uploadProfile(user),subscribe(response=>
        //)
    }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
    }
    
    GetArchiveNotes()
    {
      this.router.navigate(['/dashboard/archive'])
    }
    GetTrashNotes()
    {
      this.router.navigate(['/dashboard/trash'])
    }
    GetReminderNotes()
    {
      this.router.navigate(['/dashboard/reminder'])
    }
  
}
