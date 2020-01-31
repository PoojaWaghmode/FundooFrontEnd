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
 
  constructor( public dialogRef: MatDialogRef<EditNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,

    private noteService:NotesService,
    private snackBar:MatSnackBar,
    private dataService:DataServiceService
    ) { }

    
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
    // console.log("Data Reminder ",this.data.reminder);
   
    if(this.data.id != undefined)
    {
      if(this.data.title || this.data.description)
      {
              let note =
              {
                  Title:this.data.title,
                  Description: this.data.description,
                  Image:"",
                  color:this.data.color,
                  reminder: this.data.reminder                
              }
  
              console.log("Reminder  Edit Note :",this.data.reminder);
              console.log("d :",this.data.color);
              this.noteService.editNote(this.data.id,note).subscribe(response=>
                {
                  
                  console.log('response after Edit Note',response);
                       
                 
                  this.dataService.changeMessage(
                    {
                        type:'changeColor',
                         
                    }
                  )
                    this.dataService.changeMessage(
                      {
                        type:'getNotes'
                      }
                    )
                     
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
                      
                        this.snackBar.open(error['error']['message'] ,'Error Occured',
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
      //console.log("dfg");
      this.dataService.changeMessage(
        {
          type:'changeColor',
          data : this.data.color
        })
    }
  
        this.dialogRef.close();
    } 
  
}