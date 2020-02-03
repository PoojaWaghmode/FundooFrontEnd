import { Component, OnInit } from '@angular/core';
import{NotesService} from '../../Services/NotesService/notes.service'
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  allTrashedNotes=[];
  constructor(  private notesService:NotesService,
                private dataService:DataServiceService,
                private snackBar:MatSnackBar) { }

  ngOnInit() {
    
      this.GetTrash();
    
        this.dataService.currentMessage.subscribe(response=>
        {

          if(response.type== "getNotes")
          {
            this.GetTrash();
          }
        })
      }  

      GetTrash()
      {

          this.notesService.getTrashNotes().subscribe(response=>
          {

              console.log('response after Display  Trash Notes', response); 

              this.allTrashedNotes = response['results'] ;              
          },
          error=>
          {
              
            console.log('error msg', error);
          })
      }
      EmptyTrash()
      {
        this.notesService.emptyTrash().subscribe(response=>
          {
            console.log("Successfully All Note Trashed",response['result'])
            this.snackBar.open(response['result'],'',{
              duration:4000,
                  horizontalPosition:'start'
              }); 
          })
          this.dataService.changeMessage(
            {
                type:"getNotes"
            })  
              
      }
}
