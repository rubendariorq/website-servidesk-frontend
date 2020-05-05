import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";

//Interfaces
import { ConnectionLost } from "../../interfaces/ConnectionLost";

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
  connectionLost: ConnectionLost;

  constructor(private dependenciesService: DependenciesService) { }

  ngOnInit() {
    this.getDependencies();
  }

  getDependencies() {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos realizando la consulta',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    this.dependenciesService.getDependencies().subscribe(
      res => {
        console.log(res);

        this.connectionLost = res;
        document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();
        if (this.connectionLost.code == 'ETIMEDOUT') {
          console.log('Conexión perdida. Reconectando...');
          this.getDependencies();
        } else {
          if(res[0] == undefined){
            Swal.fire({
              icon: 'warning',
              title: 'Aviso',
              text: 'No hay dependencias registradas',
              confirmButtonColor: '00aa99'
            })
          }else{
            this.dependencies = res;
          }
        }
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
        Swal.fire({
          title: 'Espere un momento',
          text: 'Estamos realizando la consulta',
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading()
          }
        });
        this.dependenciesService.deleteDependencie(id).subscribe(
          res => {
            console.log(res);

            this.connectionLost = res;
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.deleteDependencie(id);
            } else {
              Swal.fire({
                icon: 'success',
                title: 'Hecho',
                text: 'La dependencia se ha borrado con éxito',
                confirmButtonColor: '#00aa99'
              }).then(result => {
                if (result.value) {
                  this.getDependencies();
                }
              });
            }
          },
          err => console.error(err)
        );
      }
    });
  }
}
