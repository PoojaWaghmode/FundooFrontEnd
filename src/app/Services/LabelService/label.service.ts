import { Injectable } from '@angular/core';
import { HttpServiceService } from '../HttpService/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private httpService:HttpServiceService) { }
  getLabels()
  {
    return this.httpService.get('api/Label');
  }
  createLabel(data)
  {
    return this.httpService.post('api/Label',data);
  }
  deleteLabel(labelId)
  {
    return this.httpService.delete('api/Label/'+labelId);
  }
  editLabel(id,data)
  {
    return this.httpService.put('api/Label/'+id,data);
  }
}
