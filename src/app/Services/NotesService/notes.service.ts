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
    console.log("ashjg");
    return this.httpService.post('api/Note',data);
  }
}
