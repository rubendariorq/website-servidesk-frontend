import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import Swal from "sweetalert2";

//Interfaces
import { ConnectionLost } from 'src/app/interfaces/ConnectionLost';

//Services
import { HardwareService } from "../../../services/hardware/hardware.service";
import { DependenciesService } from "../../../services/dependencies.service";

@Component({
  selector: 'app-hardware-list',
  templateUrl: './hardware-list.component.html',
  styleUrls: ['./hardware-list.component.css']
})
export class HardwareListComponent implements OnInit {

  title = 'Hardware';
  connectionLost: ConnectionLost;
  hardware: any = [];
  selectDependencie = "";
  selectTypeHardware = "";

  constructor(private hardwareService: HardwareService, private router: Router, private dependenciesService: DependenciesService) { }

  ngOnInit() {
    this.getAllHardware();
  }

  getAllHardware(): void {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos realizando la consulta',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    this.hardwareService.getAllHardware()
      .subscribe(
        res => {
          console.log(res);
          document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

          this.connectionLost = res;
          if (this.connectionLost.code == 'ETIMEDOUT') {
            console.log('Conexión perdida. Reconectando...');
            this.getAllHardware();
          } else {
            if (res[0] == undefined) {
              Swal.fire({
                icon: 'warning',
                title: 'Aviso',
                text: 'No hay hardware registrado',
                confirmButtonColor: '00aa99'
              })
            } else {
              this.hardware = res;
            }
          }
        },
        err => console.error(err)
      );
  }

  getHardwareForAllocationStatus(status: string) {
    this.selectTypeHardware = "";

    if (status != "") {
      Swal.fire({
        title: 'Espere un momento',
        text: 'Estamos realizando la consulta',
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      });
      this.hardwareService.getHardwareForAllocationStatus(status)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.getHardwareForAllocationStatus(status);
            } else {
              if (res[0] == undefined) {
                Swal.fire({
                  icon: 'warning',
                  title: 'Aviso',
                  text: 'No hay hardware registrado',
                  confirmButtonColor: '00aa99'
                })
                this.hardware = [];
              } else {
                this.hardware = [];
                this.hardware = res;
              }
            }
          },
          err => console.error(err)
        );
    } else {
      this.getAllHardware();
    }
  }

  getHardwareForType(typeHardware: string) {
    this.selectDependencie = "";

    if (typeHardware != "") {
      Swal.fire({
        title: 'Espere un momento',
        text: 'Estamos realizando la consulta',
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      });
      this.hardwareService.getHardwareForType(typeHardware)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.getHardwareForType(typeHardware);
            } else {
              if (res[0] == undefined) {
                Swal.fire({
                  icon: 'warning',
                  title: 'Aviso',
                  text: 'No hay hardware registrado',
                  confirmButtonColor: '00aa99'
                })
                this.hardware = [];
              } else {
                this.hardware = [];
                this.hardware = res;
              }
            }
          },
          err => console.error(err)
        );
    } else {
      this.getAllHardware();
    }
  }

  redirectEdit(inventory_plate: string, type_hardware: string): void {
    if (type_hardware == "Computador") {
      this.router.navigate([`/hardware/computer/edit/${inventory_plate}`]);
    } else {
      if (type_hardware == "Ups") {
        this.router.navigate([`/hardware/ups/edit/${inventory_plate}`]);
      } else {
        this.router.navigate([`/hardware/peripheral/edit/${inventory_plate}`]);
      }
    }
  }

  redirectView(inventory_plate: string, type_hardware: string): void {
    if (type_hardware == "Computador") {
      this.router.navigate([`/hardware/computer/view/${inventory_plate}`]);
    } else {
      if (type_hardware == "Ups") {
        this.router.navigate([`/hardware/ups/view/${inventory_plate}`]);
      } else {
        this.router.navigate([`/hardware/peripheral/view/${inventory_plate}`]);
      }
    }
  }

  deleteHardware(inventoryPlate: string): void {
    Swal.fire({
      icon: 'warning',
      title: '¿Desea eliminar el hardware?',
      text: 'Si elimina el hardware no podra recuperarlo más adelante',
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
        this.hardwareService.deleteHardware(inventoryPlate).subscribe(
          res => {
            console.log(res);

            this.connectionLost = res;
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.deleteHardware(inventoryPlate);
            } else {
              Swal.fire({
                icon: 'success',
                title: 'Hecho',
                text: 'El hardware se ha borrado con éxito',
                confirmButtonColor: '#00aa99'
              }).then(result => {
                if (result.value) {
                  this.getAllHardware();
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
