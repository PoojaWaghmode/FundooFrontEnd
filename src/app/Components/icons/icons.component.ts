import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { NotesService } from 'src/app/Services/NotesService/notes.service';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

    @Input() noteInfo;
    @Input() isTrash;
    @Output() messageEvent = new EventEmitter<string>();
    changeText: boolean;
    onFileSelected(event){
      console.log(event);
    }

   colors=['#fff','#f28b82','#fbbc04','#fff475','#ccff90','#a7ffeb','#cbf0f8','#aecbfa','#d7aefb',
            '#fdcfe8','#e6c9a8','#e8eaed'];
  
   constructor(  private noteService:NotesService,
                private dataService:DataServiceService,
                private snackBar:MatSnackBar) { changeText:false}
               
   
  ngOnInit() {
    
  }

  noteId : any;

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
              }
            )        
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
          } )   
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
      //console.log("color is ....",color);
      
      if(this.noteInfo != undefined)
      {
      
        //console.log("color is ....",color);
        this.messageEvent = color;

        let colorInfo={
        color : color
      }

      this.noteId = this.noteInfo.id
      this.noteService.changeColor(this.noteId,colorInfo).subscribe(response=>{
        console.log('Note  Color Changed',response);
    
      this.dataService.changeMessage
            ({
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
        this.dataService.changeMessage
        ({
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
        } )  
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

AddImage(image)
{
   this.noteId=this.noteInfo.id;
  // this.selectedFile
   
}


ChangeLabels(){"Empty"}
MakeACopy(){"Empty"}
ShowCheckboxes(){"Empty"}
CopyToGoogleDocs(){"Empty"}


}






























  
