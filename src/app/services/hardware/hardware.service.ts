import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Interfaces
import { Computer } from "../../interfaces/Computer";
import { Ups } from "../../interfaces/Ups";

@Injectable({
  providedIn: 'root'
})
export class HardwareService {

  private API_URI = 'http://localhost:3000/api';

  constructor(private http:HttpClient) { }

  createDependencie(computer: Computer): Observable<any> {
    return this.http.post(`${this.API_URI}/hardware/computers`, computer);
  }

  createUps(ups: Ups): Observable<any> {
    return this.http.post(`${this.API_URI}/hardware/ups`, ups);
  }
  
}
