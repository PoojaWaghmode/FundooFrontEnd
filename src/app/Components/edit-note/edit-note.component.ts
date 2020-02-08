import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotesService } from 'src/app/Services/NotesService/notes.service';
import { MatSnackBar } from '@angular/material';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';
@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  title=''
  description=''
  color=''
  image=''
  reminder=''
  isArchive=false
 
  constructor( public dialogRef: MatDialogRef<EditNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,

    private noteService:NotesService,
    private snackBar:MatSnackBar,
    private dataService:DataServiceService
    ) {this.dialogRef.updateSize('25%','50%'); }

    
    receiveReminder($event) 
    {
      this.data.reminder = $event
    }
    receiveColor($event)
    {
      this.data.color=$event
    }
    receiveImage($event)
    {
      this.data.image=$event
    }
    receiveArchive($event)
    {
      this.data.isArchive=$event
    }
  ngOnInit() 
  {
    this.dataService.currentMessage.subscribe(response=>
      {
        if(response.type == "changeColor")
        {
          this.data.color=response.data;
         
        }
    })
  }
  EditNote()
  {
    if(this.data.id != undefined)
    {
      if(this.data.title || this.data.description)
      {
              let note =
              {
                  Title:this.data.title,
                  Description: this.data.description,
                  Image:this.data.image,
                  Color:this.data.color,
                  Reminder: this.data.reminder ,
                  IsArchive:this.data.isArchive               
              }
  
              this.noteService.editNote(this.data.id,note).subscribe(response=>
              {
                  
                  console.log('response after Edit Note',response);
                  
                  this.dataService.changeMessage({
                        type:'changeColor',
                         
                  })
                   this.dataService.changeMessage({
                        type:'getNotes'
                      
                   })
                     
                  this.snackBar.open(response['message'],'',
                  {
                          duration:2000,
                          verticalPosition: 'top',
                          horizontalPosition:'center'
                  });
                },
                error=>
                {
                        console.log('error msg', error);
                      
                        this.snackBar.open(error['error']['results'] ,'Error Occured',
                        { 
                          duration:50000,
                          verticalPosition: 'top',
                          horizontalPosition:'center'})
                        })
                }
          else
          {
              console.error("Atleast One Field Required");
          }
    }
    else
    {
      console.error("Failed");
    }
  
        this.dialogRef.close();
    } 

    RemoveImage(data)
    {
      console.log("In Remove Image",data);
      this.noteService.deleteImage(data.id).subscribe(response=>
        {
          
          this.snackBar.open(response['data'],'',
          {
                  duration:2000,
                  verticalPosition: 'top',
                  horizontalPosition:'center'
          });
          this.dataService.changeMessage(
            {
              type:'getNotes'
            }
          )
          
        },
        error=>
        {
                console.log('error msg', error);
              
                this.snackBar.open(error['error']['results'] ,'Error Occured',
                { 
                  duration:50000,
                  verticalPosition: 'top',
                  horizontalPosition:'center'})
                })
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

}