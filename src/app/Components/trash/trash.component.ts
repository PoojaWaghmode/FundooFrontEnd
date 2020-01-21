import { Component, OnInit } from '@angular/core';
import{NotesService} from '../../Services/NotesService/notes.service'
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  allNotes=[];
  constructor(private notesService:NotesService,
    private dataService:DataServiceService) { }

  ngOnInit() {
    
     this.GetTrash();
    
    
      this.dataService.currentMessage.subscribe(response=>{
        if(response.type== "getNotes"){
          this.GetTrash();
        }
      })
    }  

  GetTrash()
  {
    this.notesService.getTrashNotes().subscribe(response=>
      {
        console.log('response after Display  Trash Notes', response); 
            this.allNotes = response['results'] ;              
     },
     error=>
      {
        console.log('error msg', error);
      })
  }

}
