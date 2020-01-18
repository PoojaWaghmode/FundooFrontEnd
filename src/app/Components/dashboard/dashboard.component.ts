import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import{Router} from '@angular/router'


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
     private router:Router) 
     {
          this.mobileQuery = media.matchMedia('(max-width: 600px)');
          this._mobileQueryListener = () => changeDetectorRef.detectChanges();
          this.mobileQuery.addListener(this._mobileQueryListener);
        
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    
   
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['/login'])
    }
  
}
