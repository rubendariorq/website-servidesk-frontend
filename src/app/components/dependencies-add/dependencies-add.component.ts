import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

//Interfaces
import { Dependencie } from "../../interfaces/Dependencie";

//Services
import { DependenciesService } from "../../services/dependencies.service";

@Component({
  selector: 'app-dependencies-add',
  templateUrl: './dependencies-add.component.html',
  styleUrls: ['./dependencies-add.component.css']
})
export class DependenciesAddComponent implements OnInit {

  dependencie: Dependencie = {
    id: 0,
    name: ''
  };

  constructor(private dependenciesService: DependenciesService, private router:Router) { }

  ngOnInit() {
  }

  createDependencie(): void {
    this.dependenciesService.createDependencie(this.dependencie)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/dependencies']);
        },
        err => console.error(err)
      )
  }

}
