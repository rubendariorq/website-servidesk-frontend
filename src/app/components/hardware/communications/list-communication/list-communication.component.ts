import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";

//Interfaces
import { ConnectionLost } from 'src/app/interfaces/ConnectionLost';

//Services
import { HardwareService } from "../../../../services/hardware/hardware.service";

@Component({
  selector: 'app-list-communication',
  templateUrl: './list-communication.component.html',
  styleUrls: ['./list-communication.component.css']
})
export class ListCommunicationComponent implements OnInit {

  title: string = "Comunicaciones";
  connectionLost: ConnectionLost;
  communications: any = [];

  constructor(private hardwareService: HardwareService) { }

  ngOnInit() {
    this.getCommunications();
  }

  getCommunications(): void {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos realizando la consulta',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    this.hardwareService.getCommunications()
      .subscribe(
        res => {
          console.log(res);
          document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

          this.connectionLost = res;
          if (this.connectionLost.code == 'ETIMEDOUT') {
            console.log('Conexión perdida. Reconectando...');
            this.getCommunications();
          } else {
            if (res[0] == undefined) {
              Swal.fire({
                icon: 'warning',
                title: 'Aviso',
                text: 'No hay dispositivos de comunicación registrados',
                confirmButtonColor: '00aa99'
              })
            } else {
              this.communications = res;
            }
          }
        },
        err => console.error(err)
      );
  }

  deleteCommunication(inventory_plate: string): void {
    Swal.fire({
      icon: 'warning',
      title: '¿Desea eliminar el dispositivo de comunicación?',
      text: 'Si lo elimina no podra recuperarlo más adelante',
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
        this.hardwareService.deleteCommunication(inventory_plate)
          .subscribe(
            res => {
              console.log(res);

              this.connectionLost = res;
              document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();
              if (this.connectionLost.code == 'ETIMEDOUT') {
                console.log('Conexión perdida. Reconectando...');
                this.deleteCommunication(inventory_plate);
              } else {
                Swal.fire({
                  icon: 'success',
                  title: 'Hecho',
                  text: 'El dispositivo de comunicación se ha borrado con éxito',
                  confirmButtonColor: '#00aa99'
                }).then(result => {
                  if (result.value) {
                    this.getCommunications();
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
