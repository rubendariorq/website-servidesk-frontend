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
  dependencies: any = [];
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
    this.dependenciesService.getDependencies()
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
              this.router.navigate(["/dependencies/add"]);
              Swal.fire({
                icon: 'warning',
                title: 'Aviso',
                text: 'Debe registrar las dependencias antes de continuar',
                confirmButtonColor: '00aa99'
              })
            } else {
              this.dependencies = res;

              this.hardwareService.getAllHardware()
                .subscribe(
                  res => {
                    console.log(res);

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
          }
        },
        err => console.error(err)
      );
  }

  getHardwareForDependencie(dependencie: string) {
    this.selectTypeHardware = "";

    if (dependencie != "") {
      Swal.fire({
        title: 'Espere un momento',
        text: 'Estamos realizando la consulta',
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      });
      this.hardwareService.getHardwareForDependencie(dependencie)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.getHardwareForDependencie(dependencie);
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

}
