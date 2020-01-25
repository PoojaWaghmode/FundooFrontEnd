import { Component, OnInit } from '@angular/core';
import{ NotesService } from '../../Services/NotesService/notes.service'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import{DataServiceService}from '../../Services/DataService/data-service.service';
import { Title } from '@angular/platform-browser';
import { IfStmt } from '@angular/compiler';
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
      reminder=''
     // reminder=''
      //isTrash=''
      //isArchive=''
      //isPin=''
    

        isOpen=true;
        constructor(
        private noteService :NotesService,
        private  router :Router,
        private snackBar:MatSnackBar,
        private dataService:DataServiceService
        ) { }

  ngOnInit() {

      this.dataService.currentMessage.subscribe(response=>{
      if(response.type == "changeColor")
      {
        this.color=response.data;
      }
      if(response.type=="setReminder")
      {
         this.reminder=response.data;
      }
       
    })
    
  }

  
  createNote()
  {
    this.isOpen=true;

    //console.log("title",this.title,"description",this.description);

    
    if(this.title || this .description)
    {
            let note={

                Title:this.title,
                Description: this.description,
                Image:"",
                color:this.color,
                eminder:this.reminder
                //reminder:this.reminder
                     
            }
            this.noteService.createNote(note).subscribe(response=>
              {
                      console.log('response after create Note',response);

                      
                      this.dataService.changeMessage({
                        type:'getNotes'
                      })

                      this.dataService.changeMessage(
                        {
                          type:'changeColor'
                        }
                      )
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
                        horizontalPosition:'center' } )
                      })
      
               }
    else
    {
      console.error("Atleast one field Required");
    }
    this.title='';
    this.description='';
    this.reminder='';
    this.color='';

  } 
    
    
}
 


