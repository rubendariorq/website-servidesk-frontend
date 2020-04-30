import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

//Interface
import { Dependencie } from "../../interfaces/Dependencie";

//Services
import { DependenciesService } from "../../services/dependencies.service";

@Component({
  selector: 'app-dependencies-edit',
  templateUrl: './dependencies-edit.component.html',
  styleUrls: ['./dependencies-edit.component.css']
})
export class DependenciesEditComponent implements OnInit {

  title: String = "Dependencias";
  aux = [];
  dependencie: Dependencie = {
    id: 0,
    name: ''
  };

  constructor(private dependenciesServices: DependenciesService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.dependenciesServices.getDependencie(params.id)
        .subscribe(
          res => {
            this.aux = res;
            if (this.aux.length == 0) {
              this.router.navigate(['/dependencies']);
              Swal.fire({
                icon: 'warning',
                text: 'La dependencia no existe',
                confirmButtonColor: '#00aa99'
              });
            } else {
              this.dependencie = res[0];
            }
          },
          err => console.error(err)
        );
    }
  }

  updateDependencie(id: string): void {
    if (this.dependencie.name == '') {
      Swal.fire({
        icon: 'warning',
        text: 'Debe llenar todos los campos',
        confirmButtonColor: '#00aa99'
      });
    } else {
      if (this.dependencie.name.length < 100) {
        this.dependenciesServices.editDependencie(id, this.dependencie)
          .subscribe(
            res => {
              this.router.navigate(['/dependencies']);
              Swal.fire({
                icon: 'success',
                text: 'La dependencia ha sido modificada con éxito',
                confirmButtonColor: '#00aa99'
              });
            },
            err => console.error(err)
          );
      } else {
        Swal.fire({
          icon: 'warning',
          text: 'Solo se permite máximo 100 caracteres',
          confirmButtonColor: '#00aa99'
        });
      }
    }
  }
}
