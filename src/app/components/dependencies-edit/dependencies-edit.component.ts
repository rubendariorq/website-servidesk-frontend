import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

//Interface
import { Dependencie } from "../../interfaces/Dependencie";
import { ConnectionLost } from "../../interfaces/ConnectionLost";

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
  connectionLost: ConnectionLost;
  dependencie: Dependencie = {
    id_dependencie: 0,
    name_dependencie: ''
  };

  constructor(private dependenciesServices: DependenciesService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getDependencie();
  }

  getDependencie() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      Swal.fire({
        title: 'Espere un momento',
        text: 'Estamos realizando la consulta',
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      });
      this.dependenciesServices.getDependencie(params.id)
        .subscribe(
          res => {
            console.log(res);

            this.connectionLost = res;
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();
            if (this.connectionLost.code == "ETIMEDOUT") {
              console.log('Conexión perdida. Reconectando...');
              this.getDependencie();
            } else {
              this.aux = res;
              if (this.aux.length == 0) {
                Swal.fire({
                  icon: 'warning',
                  text: 'La dependencia no existe',
                  confirmButtonColor: '#00aa99'
                }).then(result => {
                  if (result.value) {
                    this.router.navigate(['/dependencies']);
                  }
                });
              } else {
                this.dependencie = res[0];
              }
            }
          },
          err => console.error(err)
        );
    }
  }

  updateDependencie(id: string): void {
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
        this.dependenciesServices.editDependencie(id, this.dependencie)
          .subscribe(
            res => {
              console.log(res);

              this.connectionLost = res;
              document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();
              if (this.connectionLost.code == "ETIMEDOUT") {
                console.log('Conexión perdida. Reconectando...');
                this.updateDependencie(id);
              } else {
                Swal.fire({
                  icon: 'success',
                  text: 'La dependencia ha sido modificada con éxito',
                  confirmButtonColor: '#00aa99'
                }).then(result =>  {
                  if(result.value){
                    this.router.navigate(['/dependencies']);
                  }
                });
              }
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
