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
    return this.httpService.get('api/Note/Archieve');
  }
  getTrashNotes()
  {
    return this.httpService.get('api/Note/Trash');
  }
  getReminderNotes()
  {
    return this.httpService.get('api/Note/Reminder');
  }
  trashNote(noteId)
  {
    return this.httpService.put('api/Note/'+noteId+'/Trash', noteId);
  }
  deleteNote(noteId)
  {
    return this.httpService.delete('api/Note/'+noteId)
  }
  restoreNote(noteId)
  {
    return this.httpService.put('api/Note/'+noteId+'/Restore',noteId)
  }
  changeColor(noteId,color)
  {
    return this.httpService.put('api/Note/'+noteId+'/ChangeColor',color);
  }
  archiveNote(noteId)
  {
    return this.httpService.put('api/Note/'+noteId+'/Archieve',noteId);
  }
  addImage(noteId,file)
  {
    return this.httpService.post('api/Note'+noteId+'/Image',file)
  }
  editNote(id,data)
  {
    console.log("data :", id,data);
    return this.httpService.put('api/Note/'+id,data);
  }
  setReminder(noteId,data)
  {
    return this.httpService.put('api/Note/'+noteId+'/SetReminder',data);
  }
  searchNotes(searchNote)
  {
    console.log("in ser",searchNote );
    
    return this.httpService.get('api/Note/SearchNotes/'+searchNote);
  }

}
