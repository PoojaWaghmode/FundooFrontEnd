import { Component, OnInit, Input } from '@angular/core';
import{Router} from '@angular/router';
import{UserServiceService} from '../../Services/UserService/user-service.service';
import {DataServiceService} from '../../Services/DataService/data-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { NotesService } from 'src/app/Services/NotesService/notes.service';
import { MatSnackBar } from '@angular/material';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

 @Input() getChildMessage;
 
 color:any
 message:string;
 reminder=''
 image=''
 value='1'
 isChecked=false
 visible = true;
 selectable = true;
 removable = true;
 constructor( private router:Router,
               private userService:UserServiceService,
               private dataService:DataServiceService,
               private noteService:NotesService,
               private snackBar:MatSnackBar,
               public dialog: MatDialog
               ) { }

  
  receiveReminder($event) 
  {
    this.reminder = $event
  }
  receiveColor($event)
  {
    this.color=$event;
  }
  receiveImage($event)
  {
    this.image=$event;
  }

  ngOnInit() 
  {
    this.dataService.currentMessage.subscribe(response=>
      {
        if(response.type == "ChangeView")
        {

          this.value = response.data;
        }
        if(response.type == "GetLables")
        {
          this.value = response.data
        }
    })
  }

  openDialog(noteData)
  {
    const dialogRef = this.dialog.open(EditNoteComponent,
    {
      panelClass: 'myapp-no-padding-dialog',
      width: '590px', 
      data: noteData
    });
 }

 DeleteReminder(data)
 {
  
    console.log("Data:",data.id);
    
     this.noteService.deleteReminder(data.id).subscribe(response=>
     {
         console.log('Note  Reminder Deleted' );
         this.dataService.changeMessage(
         {
             type:"getNotes"
         })   
         this.snackBar.open(response['message'],'',{
         duration:4000,
         horizontalPosition:'start'
         });
     },
     error=>
     {
         console.log('error msg', error);
     })
 }

 PinNote(data)
 {
   console.log("In Pin");
   this.noteService.pinNote(data.id).subscribe(response=> {
      
      this.dataService.changeMessage
      ({
        type:"PinNote"
      })
      this.dataService.changeMessage
      ({
          type:"getNotes"
       })  
       this.snackBar.open(response['message'],'',{
          duration:4000,
          horizontalPosition:'start'
        });
        error=>
        {
              console.log('error msg', error);
        }

     })
  }

  Collaborator(note)
  {
    const dialogRef = this.dialog.open(CollaboratorComponent,
      {
      width: '600px', 
      data: note
      });
  }
  DeleteLabel(note,label)
  {
    console.log("Delete label on note");
    this.noteService.deleteLabelOnNote(note.id,label.id).subscribe(response=>{
      console.log("Deleted",response['results'])
      this.snackBar.open(response['message'],'',{
        duration:2000,
        verticalPosition: 'top',
        horizontalPosition:'center'

      });
      this.dataService.changeMessage(
        {
          type : 'getNotes'
        }
      )
    })
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.getChildMessage, event.previousIndex, event.currentIndex);
  }
}
