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
      // isTrash=''
      // isArchive=''
      // isPin=''
    

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
    })
    this.dataService.currentMessage.subscribe(response=>{
      if(response.type == "setReminder")
      {
        this.reminder=response.data;
      }
    })
    this.dataService.currentMessage.subscribe(response=>{
      if(response.type == "addImage")
      {
        this.image=response.data;
      }
    })
    
  }
  receiveReminder($event)
  {
      this.reminder = $event;
  }
  receiveColor($event)
  {
    this.color=$event
  }
  receiveImage($event)
  {
    console.log("Image:"+event);
    this.image=$event
  }
  createNote()
  {
    this.isOpen=true;

   

    
    if(this.title || this .description)
    {
            let note={

                Title:this.title,
                Description: this.description,
                image:this.image,
                color:this.color,               
                reminder:this.reminder,
                // isArchive:this.isArchive,
                // isTrash:this.isTrash,
                // isPin:this.isPin
                     
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
                      // this.dataService.changeMessage({
                      //   type:'setReminder'
                      // })
                      this.dataService.changeMessage({
                        type:'addImage'
                      })
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
 


