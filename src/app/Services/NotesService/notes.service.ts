import { Injectable } from '@angular/core';
import{HttpServiceService}from './../HttpService/http-service.service'


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor( private httpService:HttpServiceService ) { }
  getNotes()
  {
    return this.httpService.get('api/Note');
  }

  createNote(data)
  {
    return this.httpService.post('api/Note',data);
  }

  getArchiveNotes()
  {
    console.log("Archve");
    return this.httpService.get('api/Note/Archieve')
  }
  getTrashNotes()
  {
    console.log()
    return this.httpService.get('api/Note/Trash')
  }
}
