import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Interfaces
import { Dependencie } from '../interfaces/Dependencie';
import { Observable } from 'rxjs';
import { DependenciesAddComponent } from '../components/dependencies-add/dependencies-add.component';

@Injectable({
  providedIn: 'root'
})
export class DependenciesService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getDependencies():Observable<any> {
    return this.http.get(`${this.API_URI}/dependencies`);
  }

  createDependencie(dependencie: Dependencie): Observable<any> {
    return this.http.post(`${this.API_URI}/dependencies`, dependencie);
  }

}
