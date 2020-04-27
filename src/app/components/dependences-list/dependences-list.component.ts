import { Component, OnInit } from '@angular/core';

//Interfaces
import { Dependencie } from "../../interfaces/Dependencie";

//Services
import { DependenciesService } from '../../services/dependencies.service';

@Component({
  selector: 'app-dependences-list',
  templateUrl: './dependences-list.component.html',
  styleUrls: ['./dependences-list.component.css']
})
export class DependencesListComponent implements OnInit {

  title: String = "Dependencias";
  dependencies: any = [];

  constructor(private dependenciesService: DependenciesService) { }

  ngOnInit() {
    this.getDependencies();
  }

  getDependencies() {
    this.dependenciesService.getDependencies().subscribe(
      res => {
        this.dependencies = res;
      },
      err => console.error(err)
    );
  }
}
