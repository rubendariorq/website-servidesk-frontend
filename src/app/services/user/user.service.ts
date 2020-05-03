import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Interfaces
import { User } from "../../interfaces/User";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any>{
    return this.http.get(`${this.API_URI}/users`);
  }
}
