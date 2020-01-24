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
  constructor( private router:Router,
               private userService:UserServiceService,
               private dataService:DataServiceService,public dialog: MatDialog) { }

  receiveMessage($event)
  {
        this.message = $event
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

    
  
   //console.log('childMessage',this.getChildMessage);
 
}

}
