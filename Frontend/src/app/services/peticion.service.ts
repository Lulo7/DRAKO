import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http: HttpClient) { }

  dominio:string = "http://localhost:3001/api"
  dominioavatar:string = "http://localhost:3001"
  sitekey:string = "0x4AAAAAAFBy1QR1aO0IJdgy"

  Post(url:string, payload:any){
    return this.http.post(url, payload, {withCredentials:true})
  }

  Get(url:string){
    return this.http.get(url, {withCredentials:true})
  }

  Put(url:string, payload:any){
    return this.http.put(url, payload, {withCredentials:true})
  }

  Delete(url:string, payload:any){
    return this.http.request("DELETE", url, {
      body:payload,
      withCredentials:true
    })
  }

  Upload(file:File, api:string):Observable<any> {
    const formData = new FormData
    formData.append("file", file)
    return this.http.post(api, formData, {withCredentials:true})
  }
}
