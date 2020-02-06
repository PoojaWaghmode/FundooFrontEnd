import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef} from '@angular/core';
import { Router} from '@angular/router'
import { MatSnackBar} from '@angular/material';
import { AdminService } from 'src/app/Service/Admin/admin.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  firstName = '';
  lastName ='';
  userName ='';
  mobile ='';
  serviceType ='';
  profilePicture =''
  ownerName = '';
  email = '';
  basic ='';
  advance ='';
  ProfilePicture=localStorage.getItem('ProfileImage');
  displayedColumns: string[] = ['firstName', 'lastName', 'userName','mobile','email','serviceType'];
  AllUsersData=[];
  dataSource
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  paginator: MatPaginator;

  mobileQuery: MediaQueryList;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;
  
  constructor(changeDetectorRef: ChangeDetectorRef,
     media: MediaMatcher,
     private router:Router,
     private snackBar:MatSnackBar ,
     private adminService:AdminService
    
     )
     {
          this.mobileQuery = media.matchMedia('(max-width: 600px)');
          this._mobileQueryListener = () => changeDetectorRef.detectChanges();
          this.mobileQuery.addListener(this._mobileQueryListener);  
    }
    
  ngOnInit() {
    
   
    this.UserStatstics();
    this.GetUsers();
    this.firstName = localStorage.getItem('FirstName');
    this.lastName = localStorage.getItem('LastName');
    this.profilePicture = localStorage.getItem('Profilepicture');
    this.email = localStorage.getItem('Email');
    this.ownerName = this.firstName + " " + this.lastName; 
    
    
  }

  public handlePage(e: any) 
  {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() 
  {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
   
  }

    logOut()
    {
    localStorage.clear();
    this.router.navigate(['/login'])
    }
    

    UploadProfile(files:File)
    {
       let fileToUpload = <File>files[0];
       const formData: FormData = new FormData();
       formData.append('formFile', fileToUpload); 
       this.adminService.uploadProfile(formData).subscribe(response=>
       {
         localStorage.setItem('ProfileImage',response['data']['profileImage']);
         this.ProfilePicture=response['data']['profileImage']
       
           this.snackBar.open(response['message'],'',{
           duration:4000,
           horizontalPosition:'start'
       });
       })
       error=>
       {
             console.log('error msg', error);
       }
    }

    UserStatstics()
    {
      this.adminService.countBasicAndAdvanceUsers().subscribe(response=>{
      console.log("users are : ",response);
      this.basic=response['users']['Basic']
      console.log("Basic users are ",this.basic);
      this.advance=response['users']['Advance']
      console.log("Advance Users Are:",this.advance)

      })
    }

    GetUsers()
    {
      this.adminService.getUsers().subscribe(response=>{
        console.log("All Users:",response['data']);
        this.dataSource=response['data'];     
        console.log("In Datasource:",this.dataSource);
       
          this.dataSource = new MatTableDataSource<Element>(response['data']);
          this.dataSource.paginator = this.paginator;
          this.array = response['data'];
          this.totalSize = this.array.length;
          this.iterator();
        
      })
    }

    applyFilter(filterValue: string)
    {
      this.adminService.getUsers().subscribe(response=>{
        console.log("All Users:",response['data']);
        this.dataSource=response['data'];     
        console.log("In Datasource:",this.dataSource);      
        
      })
      this.dataSource.filter = filterValue.trim().toLowerCase();
      console.log("Filter:",this.dataSource.filter)
    }

}
