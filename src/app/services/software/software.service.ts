import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Interfaces
import { Software } from "../../interfaces/Software";
import { SoftwareForComputer } from 'src/app/interfaces/SoftwareForComputer';

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  private API_URI = 'http://localhost:3200/api';

  constructor(private http:HttpClient) { }

  createSoftware(software: Software): Observable<any> {
    return this.http.post(`${this.API_URI}/software/`, software);
  }

  getAllSoftware(): Observable<any> {
    return this.http.get(`${this.API_URI}/software/`);
  }

  getSoftware(id_software: number): Observable<any> {
    return this.http.get(`${this.API_URI}/software/${id_software}`);
  }

  getSoftwareForType(software_type: string): Observable<any> {
    return this.http.get(`${this.API_URI}/software/filter/${software_type}`);
  }

  updateSoftware(software: Software): Observable<any> {
    return this.http.put(`${this.API_URI}/software/`, software);
  }

  deleteSoftware(id_software: number): Observable<any> {
    return this.http.delete(`${this.API_URI}/software/${id_software}`);
  }

  installSoftware(softwareForComputer: SoftwareForComputer): Observable<any> {
    return this.http.post(`${this.API_URI}/software/install`, softwareForComputer);
  }

  getSoftwareInstalled(inventory_plate: string): Observable<any> {
    return this.http.get(`${this.API_URI}/software/install/${inventory_plate}`);
  }

  deleteSoftwareInstalled(softwareForComputer: SoftwareForComputer): Observable<any> {
    return this.http.post(`${this.API_URI}/software/uninstall`, softwareForComputer);
  }
}
