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


 
  constructor( public dialogRef: MatDialogRef<EditNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,

    private noteService:NotesService,
    private snackBar:MatSnackBar,
    private dataService:DataServiceService
    ) { }

    
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

  title=''
  description=''
  color=''
  image=''
  reminder=''

  EditNote()
  {
    console.log("Data:",this.data);
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

            console.log("d :",this.data.color);
            this.noteService.editNote(this.data.id,note).subscribe(response=>
              {
                
                      console.log('response after Edit Note',response);
                      console.log("d :",this.data.color);
                      
                      this.dataService.changeMessage({
                        type:'getNotes'
                      })
                      // this.dataService.changeMessage({
                      //   type:'changeColor'
                      // })


                      this.snackBar.open(response['message'],'',{
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
        this.dialogRef.close();
    } 
  
}