import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";

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

  deleteDependencie(id: string): void {
    Swal.fire({
      icon: 'warning',
      title: '¿Desea eliminar la dependencia?',
      text: 'Si elimina la dependencia no podra recuperarla más adelante',
      showCancelButton: true,
      confirmButtonColor: '#00aa99',
      cancelButtonColor: '#ED213A',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.dependenciesService.deleteDependencie(id).subscribe(
          res => {
            this.getDependencies();
            Swal.fire({
              icon: 'success',
              title: 'Hecho',
              text: 'La dependencia se ha borrado con éxito',
              confirmButtonColor: '#00aa99'
            });
          },
          err => console.error(err)
        );
      }
    });
  }
}
