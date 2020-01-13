import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material';
import{Router} from '@angular/router';
import{UserServiceService} from '../../Services/UserService/user-service.service';
@Component({
  selector: 'app-display-notes',
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {

 

  constructor(
   
    private router:Router,
    private userService:UserServiceService) { }

  ngOnInit() {
  }

}
