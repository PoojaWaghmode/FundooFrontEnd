import { Component, OnInit, Input } from '@angular/core';

import{Router} from '@angular/router';
import{UserServiceService} from '../../Services/UserService/user-service.service';
import {DataServiceService} from '../../Services/DataService/data-service.service'
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
               private dataService:DataServiceService) { }

  receiveMessage($event)
  {
        this.message = $event
  }

  ngOnInit() 
  {
    
     console.log(this.getChildMessage);
   
  }

}
