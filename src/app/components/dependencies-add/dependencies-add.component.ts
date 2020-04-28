import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import Swal from "sweetalert2";

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
      Swal.fire({
        icon: 'warning',
        text: 'Debe llenar todos los campos',
        confirmButtonColor: '#00aa99'
      });
    } else {
      if (this.dependencie.name.length < 100) {
        this.dependenciesService.createDependencie(this.dependencie)
          .subscribe(
            res => {
              console.log(res);
              this.router.navigate(['/dependencies']);
              Swal.fire({
                title: 'Hecho',
                text: 'La dependencia se creó con exito',
                icon: 'success',
                confirmButtonColor: '#00aa99'
              });
            },
            err => console.error(err)
          )
      }else{
        Swal.fire({
          icon: 'warning',
          text: 'Solo se permite máximo 100 caracteres',
          confirmButtonColor: '#00aa99'
        });
      }
    }
  }
}
