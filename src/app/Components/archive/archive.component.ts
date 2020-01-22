import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../Services/NotesService/notes.service';
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';


@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  allNotes=[];
  constructor( private notesService:NotesService,
               private dataService:DataServiceService) { }


  ngOnInit(){

      this.GetArchiveNotes();
      this.dataService.currentMessage.subscribe(response=>
      {
        
            if(response.type== "getNotes")
            {
                this.GetArchiveNotes();
            }
            
            })
       }


    GetArchiveNotes()
    {
          this.notesService.getArchiveNotes().subscribe(response=>
          {
              console.log('response after Display  Archive Notes', response['result']); 

              this.allNotes = response['results'];              
          },
          error=>
          {
              console.log('error msg', error);
          })
    }  

 }

