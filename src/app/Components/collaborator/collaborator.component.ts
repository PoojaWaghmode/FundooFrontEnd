import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotesService } from 'src/app/Services/NotesService/notes.service';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private noteService:NotesService,
    private snackBar:MatSnackBar,
    private dataService:DataServiceService
   ) { } 
  firstName = '';
  lastName ='';
  profilePicture =''
  ownerName= '';
  email = '';
  collaborator='';

  persons =[];

  @Output() collaboratorEvent = new EventEmitter<string>();
   
  ngOnInit() 
  {
    
    this.firstName = localStorage.getItem('FirstName');
    this.lastName = localStorage.getItem('LastName');
    this.profilePicture = localStorage.getItem('Profilepicture');
    this.email = localStorage.getItem('Email');
    this.ownerName = this.firstName + " " + this.lastName;  
  console.log("as",this.data)  
  }

  AddCollaborator()
  {
    if(this.collaborator)
    {
      let noteInfo = 
      {
        receiverId : this.collaborator
      }

      this.noteService.addCollaborator(this.data.id, noteInfo.receiverId).subscribe(response =>
        {
          this.snackBar.open(response['message'],'Successfull',
          {
            duration : 2000,
            horizontalPosition :'start'
          })
          this.dataService.changeMessage(
            {
              type : 'getNotes'
            });
        },
        error =>
        {
          console.log("Error",error);
          this.snackBar.open(error.error['message'],'',
          {
            duration : 2000,
            horizontalPosition :'center',
            verticalPosition : 'top'
          })
        })
    }
    this.dialogRef.close();
  }

  RemoveCollaborator(collabInfo)
  {
   console.log("In Remove");
    if(collabInfo)
    {
      console.log("Collaborat",collabInfo);
        
      this.noteService.removeCollaborator(this.data.id, collabInfo.emailId).subscribe(response =>
        {
          this.snackBar.open(response['message'],'',
          {
            duration : 2000,
            horizontalPosition :'start'
          })
          this.dataService.changeMessage(
            {
              type : 'getNotes'
            });
        },
        error =>
        {
          console.log("Error",error);
          this.snackBar.open(error.error['message'],'',
          {
            duration : 2000,
            horizontalPosition :'center',
            verticalPosition : 'top'
          })
        })
    }
  }
 
}
