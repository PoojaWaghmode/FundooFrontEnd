import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { NotesService } from 'src/app/Services/NotesService/notes.service';
import { DataServiceService } from "../../Services/DataService/data-service.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  constructor( 
    private router:Router,
    private notesService:NotesService,
    private dataService:DataServiceService
) { }

  ngOnInit()
   {
        this.getAllNotes()
    
        this.dataService.currentMessage.subscribe(response=>
        {
          if(response.type== "getNotes")
          {
            this.getAllNotes();
          }
         
      })

  }
 
  pinnedNotes=[];
  unpinnedNotes=[];
  allNotes=[];
 
  separateNotes()
  {
    this.pinnedNotes=[];
    this.unpinnedNotes=[];
    for (let i = 0; i < this.allNotes.length; i++) 
    {
      if(this.allNotes[i].isPin == true)
      {
        this.pinnedNotes.push(this.allNotes[i]);
      }
      else
      {
        this.unpinnedNotes.push(this.allNotes[i]);
      }
    }
  }
 
 
 getAllNotes()
  {
   this.notesService.getNotes().subscribe(response=>
   {
      console.log('response after Display Notes', response['message']); 
      this.allNotes = response['results'] 
      this.separateNotes();              
   },
   error=>
  {
      console.log('error msg', error);
  })
  }           
}
 
