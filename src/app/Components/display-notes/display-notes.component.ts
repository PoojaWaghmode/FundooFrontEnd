import { Component, OnInit, Input } from '@angular/core';

import{Router} from '@angular/router';
import{UserServiceService} from '../../Services/UserService/user-service.service';
@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

 @Input() displayArray;

  constructor(
   
    private router:Router,
    private userService:UserServiceService) { }

  ngOnInit() {
    
    console.log(this.displayArray);
    
  }

}
