import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef} from '@angular/core';
import{Router} from '@angular/router'
import {UserServiceService} from '../../Services/UserService/user-service.service'
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';
import { NotesService } from 'src/app/Services/NotesService/notes.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { LabelService } from 'src/app/Services/LabelService/label.service';
import { EditNoteComponent } from '../edit-note/edit-note.component';
 import { EditLabelsComponent } from '../edit-labels/edit-labels.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  value='';
  listView=1;
  ProfilePicture=localStorage.getItem('ProfileImage');
  allLabels=[];

  mobileQuery: MediaQueryList;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef,
     media: MediaMatcher,
     private router:Router,
     private userService:UserServiceService,
     private dataService:DataServiceService,
     private noteService:NotesService,
     private snackBar:MatSnackBar ,
     private labelService:LabelService,
     public dialog: MatDialog
     )
     {
          this.mobileQuery = media.matchMedia('(max-width: 600px)');
          this._mobileQueryListener = () => changeDetectorRef.detectChanges();
          this.mobileQuery.addListener(this._mobileQueryListener);  
    }
  ngOnInit() {
    
    this.GetLabels();
    this.dataService.currentMessage.subscribe(response=>
      {
        if(response.type == "GetLabels")
        {
          this.GetLabels();
        }
      })
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

    SearchNotes(event)
    {
        console.log("Event: ", event);
        this.value=event.target.value
        this.router.navigate(['/dashboard/search'])
        console.log("Event....................",event.target.value);
       
        this.dataService.changeMessage({
          type:"SearchNotes",
          data:this.value
        })
    }
   ChangeView(value)
   {
      this.listView=value;
      this.dataService.changeMessage
      ({
        type:"ChangeView",
        data:value
      })
   }
   UploadProfile(files:File)
   {
    let fileToUpload = <File>files[0];
    const formData: FormData = new FormData();
    formData.append('formFile', fileToUpload); 
    this.noteService.uploadProfile(formData).subscribe(response=>
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
   GetLabels()
   {
    this.labelService.getLabels().subscribe(response=>
      {
         console.log('response after Display Labels', response['message']); 
         this.allLabels = response['results'] 
         console.log( "All Labels:",response['results'] );
                           
      },
      error=>
     {
         console.log('error msg', error);
     })
   }

   EditLabels()
   {

        const dialogRef = this.dialog.open(EditLabelsComponent, {
          panelClass: 'myapp-no-padding-dialog',
          width: '300px', 
          data: this.allLabels
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        
        });
   }
   ChangeProfile()
   {
    const dialogRef = this.dialog.open(EditLabelsComponent, {
      panelClass: 'myapp-no-padding-dialog',
      width: '280px',
      height:'430px',
      data: this.allLabels
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    
    });

   }

}
