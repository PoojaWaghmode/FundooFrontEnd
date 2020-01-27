import { Component, OnInit, Input } from '@angular/core';

import{Router} from '@angular/router';
import{UserServiceService} from '../../Services/UserService/user-service.service';
import {DataServiceService} from '../../Services/DataService/data-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';

@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

 @Input() getChildMessage;
 
 color:any
 message:string;
 reminder=''

  constructor( private router:Router,
               private userService:UserServiceService,
               private dataService:DataServiceService,public dialog: MatDialog) { }

  
  receiveReminder($event) 
  {
    this.reminder = $event
  }
  receiveColor($event)
  {
    this.color=$event;
  }
  

  ngOnInit() 
  {
  }
  openDialog(noteData)
    {
    const dialogRef = this.dialog.open(EditNoteComponent, {
      width: '450px',
      height:'200px',
      data: noteData
    });
}

}
