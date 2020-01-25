import { Component, OnInit } from '@angular/core';
import{NotesService} from '../../Services/NotesService/notes.service'
import { DataServiceService } from 'src/app/Services/DataService/data-service.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  allSearchedNotes=[];
  searchValue:any;
  constructor(private noteService:NotesService,
              private dataService:DataServiceService) { }

  ngOnInit() {
    
    this.dataService.currentMessage.subscribe(response=>
      {
        if(response.type == "SearchNotes")
        {
          this.searchValue = response.data
          console.log("data for search is",this.searchValue);
          
          console.log("for search",response.data);
          this.SearchNotes(this.searchValue);
        }
      })
    }  
   SearchNotes(value)
  {
      this.noteService.searchNotes(value).subscribe(response=>
      {
          console.log('response after Display  Trash Notes', response); 
          this.allSearchedNotes= response['data'] ; 
          console.log("All Search Notes:",this.allSearchedNotes);     
      },
      error=>
      {
          
        console.log('error msg', error);
      })
  }
}
