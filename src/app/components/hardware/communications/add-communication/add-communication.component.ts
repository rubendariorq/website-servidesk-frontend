import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import Swal from "sweetalert2";

//Interface
import { ConnectionLost } from 'src/app/interfaces/ConnectionLost';
import { Communication } from 'src/app/interfaces/Communication';

//Services
import { DependenciesService } from "../../../../services/dependencies.service";
import { HardwareService } from "../../../../services/hardware/hardware.service";

@Component({
  selector: 'app-add-communication',
  templateUrl: './add-communication.component.html',
  styleUrls: ['./add-communication.component.css']
})
export class AddCommunicationComponent implements OnInit {

  title: string = "Comunicaciones";
  dependencies: any = [];
  connectionLost: ConnectionLost;
  communication: Communication = {
    inventory_plate_communication: "",
    serial: "",
    object: "",
    type_device: "",
    ip_lan: "",
    ip_wan: "",
    ip_wanO: "",
    ip_wanD: "",
    property: "",
    cost: 0,
    description: "",
    dependencies_id_dependencie: 0
  }

  constructor(private dependenciesService: DependenciesService, private hardwareService: HardwareService, private router: Router) { }

  ngOnInit() {
    this.getDependencies();
  }

  getDependencies(): void {
    this.dependenciesService.getDependencies()
      .subscribe(
        res => {
          console.log(res);

          this.connectionLost = res;
          if (this.connectionLost.code == 'ETIMEDOUT') {
            console.log('Conexión perdida. Reconectando...');
            this.getDependencies();
          } else {
            this.dependencies = res;
          }
        },
        err => console.error(err)
      );
  }

  createCommunication(): void {
    if (this.communication.inventory_plate_communication == "" || this.communication.serial == "" || this.communication.object == "" || this.communication.type_device == "" || this.communication.property == "" || this.communication.cost == 0 || this.communication.dependencies_id_dependencie == 0) {
      Swal.fire({
        icon: 'warning',
        text: 'Debe llenar todos los campos que tienen (*)',
        confirmButtonColor: '#00aa99'
      });
    } else {
      Swal.fire({
        title: 'Espere un momento',
        text: 'Estamos realizando la consulta',
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      });
      this.hardwareService.createCommunications(this.communication)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.createCommunication();
            } else {
              if (this.connectionLost.message.indexOf("Duplicate") >= 0 || this.connectionLost.message.indexOf("duplicate") >= 0) {
                Swal.fire({
                  icon: 'warning',
                  text: 'La placa de inventario digitada ya existe',
                  confirmButtonColor: '#00aa99'
                });
              } else {
                Swal.fire({
                  title: 'Hecho',
                  text: 'El dispositivo de comunicación se registró con exito',
                  icon: 'success',
                  confirmButtonColor: '#00aa99'
                }).then((result) => {
                  if (result.value) {
                    this.router.navigate(['/communications']);
                  }
                });
              }
            }
          },
          err => console.error(err)
        );
    }
  }

}
