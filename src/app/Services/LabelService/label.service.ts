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

}
