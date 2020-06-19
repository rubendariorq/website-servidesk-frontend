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

}
