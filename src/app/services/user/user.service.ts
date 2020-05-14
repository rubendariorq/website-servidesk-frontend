import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Interfaces
import { User } from "../../interfaces/User";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any>{
    return this.http.get(`${this.API_URI}/users`);
  }

  getUsersForDependencie(dependencie:String): Observable<any>{
    return this.http.get(`${this.API_URI}/users/filter/dependencie/${dependencie}`);
  }

  getUsersForTypeUser(typeUser:String): Observable<any>{
    return this.http.get(`${this.API_URI}/users/filter/type-user/${typeUser}`);
  }

  getUsersForStatus(status:String): Observable<any>{
    return this.http.get(`${this.API_URI}/users/filter/status/${status}`);
  }

  getUserForEmail(email:String): Observable<any>{
    return this.http.get(`${this.API_URI}/users/filter/email/${email}`);
  }

  getUserForId(id:number): Observable<any>{
    return this.http.get(`${this.API_URI}/users/${id}`);
  }

  addUser(user:User): Observable<any>{
    return this.http.post(`${this.API_URI}/users`, user);
  }

  updateUser(id:number, user:User): Observable<any>{
    return this.http.put(`${this.API_URI}/users/${id}`, user);
  }
}
