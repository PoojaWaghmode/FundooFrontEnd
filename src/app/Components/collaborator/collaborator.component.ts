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
    @Inject(MAT_DIALOG_DATA) public data:any,
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
    this.dialogRef.updateSize('50%','60%')

    this.dataService.changeMessage(
      {
        type : 'getNotes'
      })

    this.firstName = localStorage.getItem('FirstName');
    this.lastName = localStorage.getItem('LastName');
    this.profilePicture = localStorage.getItem('Profilepicture');
    this.email = localStorage.getItem('Email');
    this.ownerName = this.firstName + " " + this.lastName;    
  }

  SearchPerson($event)
  {
    // console.log("search value: ",$event.key);
      let value =
      {
        key : $event.key
      }

      // console.log("value",value.key)
    //  this.noteService.SearchPerson(value.key).subscribe(response =>
    //   {
    //     // console.log("re",response)
    //     this.persons = response['contactList']
    //     console.log("data: ",this.persons)
    //   })
  }

  AddCollaborator()
  {
    if(this.collaborator)
    {
      let noteInfo = 
      {
        id : this.collaborator
      }

      this.noteService.addCollaborator(this.data.noteID, noteInfo).subscribe(response =>
        {
          this.snackBar.open(response['message'],'Done',
          {
            duration : 2000,
            horizontalPosition :'start'
          })
          // this.dataService.UpdatedData(
          //   {
          //     type : 'getNotes'
          //   });
        },
        error =>
        {
          console.log("Error",error);
          this.snackBar.open(error.error['message'],'Done',
          {
            duration : 2000,
            horizontalPosition :'center',
            verticalPosition : 'top'
          })
        })
    }
    this.dialogRef.close();
  }

  RemoveCollaborator(collaborator)
  {
    this.noteService.removeCollaborator(this.data.noteID,collaborator.emailID).subscribe(response =>
    {
      this.snackBar.open(response['message'],'Done',
      {
        duration : 2000,
        horizontalPosition :'center',        
        verticalPosition :'top'
      })

      this.dataService.changeMessage(
        {
          type : 'getNotes'
        });
    },
    error =>
    {
      console.log("Error: ",error);
    })
  }
}
