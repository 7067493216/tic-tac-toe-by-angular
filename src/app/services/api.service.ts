import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _httpService: HttpClient) { }

  getUsers(){
    return this._httpService.get("http://localhost:4200/api/users");
    }
  addUsers(body:any){
    return this._httpService.post("http://localhost:4200/api/users",body)
  }
  
}
