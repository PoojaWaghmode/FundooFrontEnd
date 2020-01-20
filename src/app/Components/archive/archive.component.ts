import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../Services/NotesService/notes.service';


@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  allNotes=[];
  constructor( private notesService:NotesService) { }


  ngOnInit() {
     this.GetArchiveNotes();
   }


   GetArchiveNotes()
   {
    this.notesService.getArchiveNotes().subscribe(response=>
      {
        console.log('response after Display  Archive Notes', response['result']); 
        this.allNotes = response['results']               
      },
      error=>
      {
        console.log('error msg', error);
      })
    }  

 }

