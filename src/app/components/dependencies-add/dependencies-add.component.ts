import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import Swal from "sweetalert2";

//Interfaces
import { Dependencie } from "../../interfaces/Dependencie";
import { ConnectionLost } from "../../interfaces/ConnectionLost";

//Services
import { DependenciesService } from "../../services/dependencies.service";

@Component({
  selector: 'app-dependencies-add',
  templateUrl: './dependencies-add.component.html',
  styleUrls: ['./dependencies-add.component.css']
})
export class DependenciesAddComponent implements OnInit {

  title: String = "Dependencias";
  connectionLost: ConnectionLost;
  dependencie: Dependencie = {
    id_dependencie: 0,
    name_dependencie: ''
  };

  constructor(private dependenciesService: DependenciesService, private router: Router) { }

  ngOnInit() {
  }

  createDependencie(): void {
    if (this.dependencie.name_dependencie == '') {
      Swal.fire({
        icon: 'warning',
        text: 'Debe llenar todos los campos',
        confirmButtonColor: '#00aa99'
      });
    } else {
      if (this.dependencie.name_dependencie.length < 100) {
        Swal.fire({
          title: 'Espere un momento',
          text: 'Estamos realizando la consulta',
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading()
          }
        });
        this.dependenciesService.createDependencie(this.dependencie)
          .subscribe(
            res => {
              console.log(res);

              this.connectionLost = res;
              document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();
              if (this.connectionLost.code == 'ETIMEDOUT') {
                console.log('Conexión perdida. Reconectando...');
                this.createDependencie();
              } else {
                Swal.fire({
                  title: 'Hecho',
                  text: 'La dependencia se creó con exito',
                  icon: 'success',
                  confirmButtonColor: '#00aa99'
                }).then((result) => {
                  if (result.value) {
                    this.router.navigate(['/dependencies']);
                  }
                });
              }
            },
            err => console.error(err)
          )
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
