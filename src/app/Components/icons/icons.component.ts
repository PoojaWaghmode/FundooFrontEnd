import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NotesService } from 'src/app/Services/NotesService/notes.service';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';
import { MatSnackBar } from '@angular/material';
import{DatePipe}from '@angular/common';


@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

    @Input() noteInfo;
    @Input() isTrash;
    @Output() colorEvent = new EventEmitter<string>();
    @Output() reminderEvent=new EventEmitter<string>();

   colors=['#fff','#f28b82','#fbbc04','#fff475','#ccff90','#a7ffeb','#cbf0f8','#aecbfa','#d7aefb',
            '#fdcfe8','#e6c9a8','#e8eaed'];
  
   constructor(  private noteService:NotesService,
                private dataService:DataServiceService,              
                private snackBar:MatSnackBar) { }
               
   
  ngOnInit() {
    
  }

  noteId : any;
  date:any

  TrashNote()
  {
      this.noteId = this.noteInfo.id
      console.log("id : ", this.noteId);
      console.log("id : ", this.noteInfo);
      console.log("IsTrash",this.noteInfo.isTrash);
      
      this.noteService.trashNote(this.noteId).subscribe(response=>
      {
          console.log(' Note trashed' );    
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
  DeleteNote()
  {
      this.noteId = this.noteInfo.id
      this.noteService.deleteNote(this.noteId).subscribe(response=>
      {
          console.log('Note Deleted' );
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
  
  RestoreNote()
  {
    this.noteId = this.noteInfo.id
    this.noteService.restoreNote(this.noteId).subscribe(response=>
    {
          console.log('Note Restored' );
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
  
  ChangeColor(color)
  {
    if(this.noteInfo != undefined)
    {
       //console.log("color is ....",color);
        this.colorEvent.emit(color); 
        let colorInfo=
        {
          color : color
        }
        this.noteId = this.noteInfo.id
        this.noteService.changeColor(this.noteId,colorInfo).subscribe(response=>{
        console.log('Note Color Changed',response);
        this.dataService.changeMessage(
        {
            type:"getNotes"
        })
    },
    error=>
    {
        console.log('error msg', error);
    })
     
    }
    else
    {
        this.dataService.changeMessage({
            type : "changeColor",
            data : color
        })
     }
  }


NoteArchive()
{
    this.noteId = this.noteInfo.id
    this.noteService.archiveNote(this.noteId).subscribe(response=>{
    console.log('Note Archived' );
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

AddReminder(reminder)
{
  this.reminderEvent.emit(reminder);

  let date;
  reminder.setHours(reminder.getHours()+5)
  reminder.setMinutes(reminder.getMinutes()+30);

  let noteData=
  {
    reminder: reminder 
  }

  this.noteId = this.noteInfo.id;
  console.log("In Reminder",noteData);
  this.noteService.setReminder(this.noteId,noteData).subscribe(response=>{
  console.log('response after Set Reminder',response);
  this.dataService.changeMessage({
          type:'getNotes'
    })
  })
  error=>
  {
      console.log('error msg', error); 
  }
}

LaterToday()
{
 this.date =new Date();
 this.date.setHours(20,0,0);
 console.log("Later Today Time:",this.date);
 this.AddReminder(this.date);
}

Tomorrrow()
{
 this.date=new Date();
 this.date.setHours(8,0,0);
 this.date.setDate(this.date.getDate()+1);
 console.log("Tommorow:"+this.date);
 this.AddReminder(this.date);
}

NextWeek()
{
  this.date=new Date();
  this.date.setDate((this.date.getDate() - this.date.getDay() + 1) + 7);
  console.log("Next Weak date:",this.date);
  this.date.setHours(8,0,0);
  this.AddReminder(this.date);
}
AddImage(files:File)
{
   this.noteId=this.noteInfo.id;
   let fileToUpload = <File>files[0];
   const formData: FormData = new FormData();
   formData.append('formFile', fileToUpload); 
   
   this.noteService.addImage(this.noteId,formData).subscribe(response=>
    {
      var imageUrl = response['result']

      console.log('image url',response)
   })
      
}
}






























  
