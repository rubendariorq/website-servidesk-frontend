import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Interfaces
import { Computer } from "../../interfaces/Computer";
import { Ups } from "../../interfaces/Ups";
import { Peripheral } from 'src/app/interfaces/Peripheral';

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

  createPeripheral(peripheral: Peripheral): Observable<any> {
    return this.http.post(`${this.API_URI}/hardware/peripherals`, peripheral);
  }

  getAllHardware(): Observable<any> {
    return this.http.get(`${this.API_URI}/hardware`);
  }

  getHardwareForDependencie(dependencie:String): Observable<any>{
    return this.http.get(`${this.API_URI}/hardware/filter/dependencie/${dependencie}`);
  }

  getHardwareForType(typeHardware:String): Observable<any>{
    return this.http.get(`${this.API_URI}/hardware/filter/type/${typeHardware}`);
  }

  getComputer(inventoryPlate:String): Observable<any>{
    return this.http.get(`${this.API_URI}/hardware/computers/${inventoryPlate}`);
  }

  uptadeComputer(id:string, computer:Computer): Observable<any>{
    return this.http.put(`${this.API_URI}/hardware/computers/${id}`, computer);
  }
  
}
