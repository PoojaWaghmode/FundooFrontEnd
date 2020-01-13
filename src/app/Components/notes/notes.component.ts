import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { NotesService } from 'src/app/Services/NotesService/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {


  allNotes=[]
  constructor( 
    private router:Router,
    private notesService:NotesService
) { }

  ngOnInit() {
this.getNotes()

  }
 getNotes()
 {
  this.notesService.getNotes().subscribe(response=>
              {
                console.log('response after Display Notes', response); 
                    this.allNotes=[response]
               
              },
              error=>
              {
                console.log('error msg', error);
              })
            }
}
