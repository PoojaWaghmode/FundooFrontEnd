import { Component, OnInit } from '@angular/core';
 import{ NotesService } from '../../Services/NotesService/notes.service'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import{DataServiceService}from '../../Services/DataService/data-service.service';
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
      title=''
      description=''
      color=''
      image=''

        isOpen=true;
        constructor(
        private noteService :NotesService,
        private  router :Router,
        private snackBar:MatSnackBar,
        private dataService:DataServiceService
        ) { }

  ngOnInit() {
  }

  
  createNote()
  {
    this.isOpen=true;

    console.log("title",this.title,"description",this.description);

    if(this.title || this .description)
    {
            let note={

                Title:this.title,
                Description: this.description,
                Image:"",
                Color:"#F00",
                     
            }
            this.noteService.createNote(note).subscribe(response=>
              {
                      console.log('response after create Note',response);
                      this.snackBar.open(response['message'],'',{
                        duration:2000,
                        verticalPosition: 'top',
                        horizontalPosition:'center'
                      });


                      this.dataService.changeMessage({
                        type:'createNote'
                      })


              },
              error=>
              {
                      console.log('error msg', error);
                    
                      this.snackBar.open(error['error']['message'] ,'Error Occured',
                      { 
                        duration:50000,
                        verticalPosition: 'top',
                        horizontalPosition:'center' } )
                      })
      
    
               }
        
    } 
  
   
}
 


