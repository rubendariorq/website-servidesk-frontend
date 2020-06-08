import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Interfaces
import { Dependencie } from '../interfaces/Dependencie';

@Injectable({
  providedIn: 'root'
})
export class DependenciesService {

  API_URI = 'http://localhost:3200/api';

  constructor(private http: HttpClient) { }

  getDependencies():Observable<any> {
    return this.http.get(`${this.API_URI}/dependencies`);
  }

  getDependencie(id:string):Observable<any> {
    return this.http.get(`${this.API_URI}/dependencies/${id}`);
  }

  createDependencie(dependencie: Dependencie): Observable<any> {
    return this.http.post(`${this.API_URI}/dependencies`, dependencie);
  }

  deleteDependencie(id: string): Observable<any>{
    return this.http.delete(`${this.API_URI}/dependencies/${id}`);
  }

  editDependencie(id: string, dependencie: Dependencie):Observable<any> {
    return this.http.put(`${this.API_URI}/dependencies/${id}`, dependencie);
  }
}
