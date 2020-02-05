import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpService:HttpService) { } 
  login(data)
  {
    return this.httpService.post('api/Admin/login',data)
  }
  register(data)
  {
    return this.httpService.post('api/Admin/register',data)
  }
  uploadProfile(formFile)
  {
    return this.httpService.post('api/Admin/UploadProfileImage',formFile)
  }
  countBasicAndAdvanceUsers()
  {
    return this.httpService.get('/api/Admin/UserStatistic')
  }
  getUsers()
  {
    return this.httpService.get('api/Admin/getUsers')
  }
}
