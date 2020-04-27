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

  title: String = "Dependencias";
  dependencie: Dependencie = {
    id: 0,
    name: ''
  };

  constructor(private dependenciesService: DependenciesService, private router: Router) { }

  ngOnInit() {
  }

  createDependencie(): void {
    if (this.dependencie.name == '') {
      console.log("Debe llenar el campo");
    } else {
      if (this.dependencie.name.length < 100) {
        this.dependenciesService.createDependencie(this.dependencie)
          .subscribe(
            res => {
              console.log(res);
              this.router.navigate(['/dependencies']);
            },
            err => console.error(err)
          )
      }else{
        console.log("Máximo 100 caracteres");
      }
    }
  }
}
