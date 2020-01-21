import { Component, OnInit, Input, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
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
   colors=['#fff','#f28b82','#fbbc04','#fff475','#ccff90','#a7ffeb','#cbf0f8','#aecbfa','#d7aefb','#fdcfe8','#e6c9a8','#e8eaed']
  constructor( private noteService:NotesService,
                private dataService:DataServiceService,
                private snackBar:MatSnackBar) { }
   
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
  ChangeColor(color)
  {
    this.noteId = this.noteInfo.id
    this.noteService.changeColor(this.noteId,color).subscribe(response=>{
      console.log('Note  Color Changed')
    },
    error=>
      {
          console.log('error msg', error);
      })
  }
  ChangeLabels(){"Empty"}
  MakeACopy(){"Empty"}
  ShowCheckboxes(){"Empty"}
  CopyToGoogleDocs(){"Empty"}

}
