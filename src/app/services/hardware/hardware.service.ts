import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Interfaces
import { Computer } from "../../interfaces/Computer";
import { Ups } from "../../interfaces/Ups";
import { Peripheral } from 'src/app/interfaces/Peripheral';
import { HardwareUbications } from "../../interfaces/HardwareUbications";
import { PeripheralForComputer } from 'src/app/interfaces/PeripheralForConputer';
import { Communication } from 'src/app/interfaces/Communication';

@Injectable({
  providedIn: 'root'
})
export class HardwareService {

  private API_URI = 'http://localhost:3200/api';

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

  getHardwareForAllocationStatus(allocationStatus:String): Observable<any>{
    return this.http.get(`${this.API_URI}/hardware/filter/dependencie/${allocationStatus}`);
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

  getUps(inventoryPlate:String): Observable<any>{
    return this.http.get(`${this.API_URI}/hardware/ups/${inventoryPlate}`);
  }

  uptadeUps(id:string, ups:Ups): Observable<any>{
    return this.http.put(`${this.API_URI}/hardware/ups/${id}`, ups);
  }

  getPeripheral(inventoryPlate:String): Observable<any>{
    return this.http.get(`${this.API_URI}/hardware/peripherals/${inventoryPlate}`);
  }

  uptadePeripheral(id:string, peripheral:Peripheral): Observable<any>{
    return this.http.put(`${this.API_URI}/hardware/peripherals/${id}`, peripheral);
  }

  deleteHardware(id:string): Observable<any>{
    return this.http.delete(`${this.API_URI}/hardware/${id}`);
  }

  getUbicationHardware(id:string): Observable<any>{
    return this.http.get(`${this.API_URI}/hardware/${id}`);
  }

  addUbicationHardware(hardwareUbications: HardwareUbications): Observable<any>{
    return this.http.post(`${this.API_URI}/hardware/addUbication`, hardwareUbications);
  }

  addUbicationComputer(hardwareUbications: HardwareUbications, computer: Computer): Observable<any>{
    let arrayAux = [];
    arrayAux.push(hardwareUbications);
    arrayAux.push(computer);
    return this.http.post(`${this.API_URI}/hardware/addUbication/computer`, arrayAux);
  }

  getComputersForUser(idUser: string): Observable<any>{
    return this.http.get(`${this.API_URI}/hardware/computersForUser/${idUser}`);
  }

  getUserForComputer(idComputer: string): Observable<any>{
    return this.http.get(`${this.API_URI}/hardware/userForComputer/${idComputer}`);
  }

  addPeripheralsUbicationAndLinkComputer(hardwareUbications: HardwareUbications, peripheralForComputer: PeripheralForComputer): Observable<any>{
    let arrayAux = [];
    arrayAux.push(hardwareUbications);
    arrayAux.push(peripheralForComputer);
    return this.http.post(`${this.API_URI}/hardware/peripheralsAddUbicationAndLinkComputer`, arrayAux);
  }

  addPeripheralsUbication(peripheralForComputer: PeripheralForComputer): Observable<any>{
    return this.http.post(`${this.API_URI}/hardware/peripheralsAddUbication`, peripheralForComputer);
  }

  deallocateUps(hardwareUbicationsOld: HardwareUbications, hardwareUbicationsNew: HardwareUbications): Observable<any>{
    let arrayAux = [];
    arrayAux.push(hardwareUbicationsOld);
    arrayAux.push(hardwareUbicationsNew);
    return this.http.put(`${this.API_URI}/hardware/ups`, arrayAux);
  }

  deallocatePeripheral(hardwareUbicationsOld: HardwareUbications, hardwareUbicationsNew: HardwareUbications): Observable<any>{
    let arrayAux = [];
    arrayAux.push(hardwareUbicationsOld);
    arrayAux.push(hardwareUbicationsNew);
    return this.http.put(`${this.API_URI}/hardware/peripherals`, arrayAux);
  }

  deallocateComputer(hardwareUbicationsOld: HardwareUbications, hardwareUbicationsNew: HardwareUbications): Observable<any>{
    let arrayAux = [];
    arrayAux.push(hardwareUbicationsOld);
    arrayAux.push(hardwareUbicationsNew);
    return this.http.put(`${this.API_URI}/hardware/computers`, arrayAux);
  }

  getPrintersForComputer(inventory_plate: string): Observable<any>{
    return this.http.get(`${this.API_URI}/hardware/printers/${inventory_plate}`);
  }

  disconnectPeripheral(inventory_plate: string): Observable<any>{
    return this.http.delete(`${this.API_URI}/hardware/printers/${inventory_plate}`);
  }

  getPrintersUbication(inventory_plate: string): Observable<any>{
    return this.http.get(`${this.API_URI}/hardware/printersUbication/${inventory_plate}`);
  }

  uptadeNetworkConfiguration(computer:Computer): Observable<any>{
    return this.http.put(`${this.API_URI}/hardware/computer`, computer);
  }

  createCommunications(communication: Communication): Observable<any> {
    return this.http.post(`${this.API_URI}/communications`, communication);
  }

  getCommunications(): Observable<any> {
    return this.http.get(`${this.API_URI}/communications`);
  }
}
