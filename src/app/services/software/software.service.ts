import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Interfaces
import { Software } from "../../interfaces/Software";

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  private API_URI = 'http://localhost:3200/api';

  constructor(private http:HttpClient) { }

  createSoftware(software: Software): Observable<any> {
    return this.http.post(`${this.API_URI}/software/`, software);
  }
}
