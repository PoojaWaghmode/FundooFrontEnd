import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/Services/NotesService/notes.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {

  allReminderedNotes=[];
  constructor( private noteService:NotesService) { }

  ngOnInit() {
    this.GetReminderNotes();
  }

  GetReminderNotes()
  {
      this.noteService.getReminderNotes().subscribe(response=>
      {
          console.log('response after Display  Reminder Notes', response); 
          
          this.allReminderedNotes = response['results'] ;              
      },
      error=>
      {
          console.log('error msg', error);
      })
    }
}
