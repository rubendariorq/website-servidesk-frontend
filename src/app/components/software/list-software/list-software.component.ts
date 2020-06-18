import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";

//Interfaces
import { Software } from "../../../interfaces/Software";
import { ConnectionLost } from 'src/app/interfaces/ConnectionLost';

//Services
import { SoftwareService } from "../../../services/software/software.service";

@Component({
  selector: 'app-list-software',
  templateUrl: './list-software.component.html',
  styleUrls: ['./list-software.component.css']
})
export class ListSoftwareComponent implements OnInit {

  title: string = "Software";
  connectionLost: ConnectionLost;
  software: any = [];
  selectTypeSoftware: string = "";

  constructor(private softwareService: SoftwareService) { }

  ngOnInit() {
    this.getAllSoftware();
  }

  getAllSoftware(): void {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos realizando la consulta',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    this.softwareService.getAllSoftware()
      .subscribe(
        res => {
          console.log(res);
          document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

          this.connectionLost = res;
          if (this.connectionLost.code == 'ETIMEDOUT') {
            console.log('Conexión perdida. Reconectando...');
            this.getAllSoftware();
          } else {
            if (res[0] == undefined) {
              Swal.fire({
                icon: 'warning',
                title: 'Aviso',
                text: 'No hay software registrado',
                confirmButtonColor: '00aa99'
              })
            } else {
              this.software = res;
            }
          }
        },
        err => console.error(err)
      );
  }

  deleteSoftware(id_software: number): void {
    Swal.fire({
      icon: 'warning',
      title: '¿Desea eliminar el software?',
      text: 'Si elimina el software no podra recuperarlo más adelante',
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
        this.softwareService.deleteSoftware(id_software)
          .subscribe(
            res => {
              console.log(res);

              this.connectionLost = res;
              document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();
              if (this.connectionLost.code == 'ETIMEDOUT') {
                console.log('Conexión perdida. Reconectando...');
                this.deleteSoftware(id_software);
              } else {
                Swal.fire({
                  icon: 'success',
                  title: 'Hecho',
                  text: 'El software se ha borrado con éxito',
                  confirmButtonColor: '#00aa99'
                }).then(result => {
                  if (result.value) {
                    this.getAllSoftware();
                  }
                });
              }
            },
            err => console.error(err)
          );
      }
    });
  }

  getSoftwareForType(software_type: string): void{
    if (software_type != "") {
      Swal.fire({
        title: 'Espere un momento',
        text: 'Estamos realizando la consulta',
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      });
      this.softwareService.getSoftwareForType(software_type)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.getSoftwareForType(software_type);
            } else {
              if (res[0] == undefined) {
                Swal.fire({
                  icon: 'warning',
                  title: 'Aviso',
                  text: 'No hay software registrado',
                  confirmButtonColor: '00aa99'
                })
                this.software = [];
              } else {
                this.software = [];
                this.software = res;
              }
            }
          },
          err => console.error(err)
        );
    } else {
      this.getAllSoftware();
    }
  }

}
