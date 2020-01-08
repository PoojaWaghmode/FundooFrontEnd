import { Injectable } from '@angular/core';
import{HttpServiceService} from './../HttpService/http-service.service'
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpService : HttpServiceService) { }
  register(data)
  {
    return this.httpService.post('api/UserAccount/register',data)
  }
  login(data)
  {
    return this.httpService.post('api/UserAccount/login',data)
  }
  forgetPassword(data)
  {
    return this.httpService.post('api/UserAccount/forgetPassword',data)
  }
}
