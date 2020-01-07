import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment'; 
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  baseUrl=environment.baseUrl

  constructor(private http:HttpClient) { }

post(url,data){
  let options={
    headers:new HttpHeaders({
      'Authorization':'Bearer'+localStorage.getItem('token'),
      'Content-Type':'application/json'

    })
  }
  return this.http.post(this.baseUrl +url ,data,options);
}
}