import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Interfaces
import { Licenses } from "../../interfaces/Licenses";

@Injectable({
  providedIn: 'root'
})
export class LicenseService {

  private API_URI = 'http://localhost:3200/api';

  constructor(private http:HttpClient) { }

  addLicense(license: Licenses): Observable<any> {
    return this.http.post(`${this.API_URI}/licenses/`, license);
  }

  getLicenses(): Observable<any> {
    return this.http.get(`${this.API_URI}/licenses/`);
  }
}
