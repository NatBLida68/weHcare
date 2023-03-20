import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http :HttpClient) { }
url:string = "http://localhost:3000";

saveUser(data:any){
  return this.http.post(this.url+'/users',data)
}

}
