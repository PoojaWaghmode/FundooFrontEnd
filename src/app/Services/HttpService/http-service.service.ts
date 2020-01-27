import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment'; 
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  baseUrl=environment.baseUrl

  constructor(private httpClient:HttpClient) { }

      post(url,data)
      {
          let options=
          {
            headers:new HttpHeaders
            ({
              'Authorization':'Bearer '+localStorage.getItem('token'),
             // 'Content-Type':'application/json'
            })
          }
          return this.httpClient.post(this.baseUrl+url ,data, options);
      }

      get(url)
      {
          let options=
          {
            headers:new HttpHeaders
            ({
                  'Authorization':'Bearer '+localStorage.getItem('token'),          
                  'Content-Type':'application/json'
            })
          }
          // console.log(localStorage.getItem('token'))
          return this.httpClient.get(this.baseUrl+url ,options);
      }

      put(url,data)
      {
          let options=
          {
            headers:new HttpHeaders
            ({
              'Authorization':'Bearer '+localStorage.getItem('token'),
              'Content-Type':'application/json'
            })
          }
          return this.httpClient.put(this.baseUrl+url,data, options);
      }

      delete(url)
      {
        let options=
        {
          headers:new HttpHeaders
          ({
            'Authorization':'Bearer '+localStorage.getItem('token'),          
            'Content-Type':'application/json'
          })
         }
        // console.log(localStorage.getItem('token'))
        return this.httpClient.delete(this.baseUrl+url ,options);
      }
}