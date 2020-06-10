import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";

//Interfaces
import { ConnectionLost } from "../../../interfaces/ConnectionLost";
import { HardwareUbications } from 'src/app/interfaces/HardwareUbications';

//Services
import { HardwareService } from "../../../services/hardware/hardware.service";
import { UserService } from "../../../services/user/user.service";
import { DependenciesService } from "../../../services/dependencies.service";
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-section-location-history',
  templateUrl: './section-location-history.component.html',
  styleUrls: ['./section-location-history.component.css']
})
export class SectionLocationHistoryComponent implements OnInit {
  selectDisabled: boolean = true;
  allocationStatus: boolean = false;
  hardwareUbication: HardwareUbications = {
    users_id_user: 0,
    hardware_inventory_plate: "",
    assignment_date: "",
    return_date: "",
    id_user: 0,
    email: "",
    name: "",
    password: "",
    password_changed_date: "",
    type_user: "",
    allocation_status: "",
    failed_attempts: 0,
    dependencies_id_dependencie: 0,
    id_dependencie: 0,
    name_dependencie: ""
  };
  hardwareUbication2: HardwareUbications = {
    users_id_user: 0,
    hardware_inventory_plate: "",
    assignment_date: "",
    return_date: "",
    id_user: 0,
    email: "",
    name: "",
    password: "",
    password_changed_date: "",
    type_user: "",
    allocation_status: "",
    failed_attempts: 0,
    dependencies_id_dependencie: 0,
    id_dependencie: 0,
    name_dependencie: ""
  };
  hardwareUbications: any = [];
  connectionLost: ConnectionLost;
  hardwareAssignment: boolean = false;

  constructor(private hardwareService: HardwareService, private activatedRoute: ActivatedRoute, private userService: UserService, private dependenciesService: DependenciesService) { }

  ngOnInit() {
    this.getUbications();
    this.hardwareUbication.return_date == "";
  }

  getUbications(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.hardwareUbication.hardware_inventory_plate = id;

    this.hardwareService.getUbicationHardware(id)
      .subscribe(
        res => {
          console.log(res);

          this.connectionLost = res;
          if (this.connectionLost.code == 'ETIMEDOUT') {
            console.log('Conexión perdida. Reconectando...');
            this.getUbications();
          } else {
            this.hardwareUbications = res;

            let aux = "";
            let date = [];
            let arrayAux = [];
            let i = 0;
            while (i < this.hardwareUbications.length) {
              if (this.hardwareUbications[i].assignment_date != null) {
                aux = this.hardwareUbications[i].assignment_date;
                date = aux.split('T');
                this.hardwareUbications[i].assignment_date = date[0];
              }
              if (this.hardwareUbications[i].return_date != null) {
                aux = this.hardwareUbications[i].return_date;
                date = aux.split('T');
                this.hardwareUbications[i].return_date = date[0];
                arrayAux.push(this.hardwareUbications[i]);
              } else {
                this.hardwareAssignment = true;
                this.hardwareUbication = this.hardwareUbications[i];
                this.allocationStatus = true;
              }
              i++;
            }
            this.hardwareUbications = arrayAux;
          }
        },
        err => console.error(err)
      );
  }

  deallocateHardwareForUser(): void {
    let inventory_plate = this.activatedRoute.snapshot.params.id;
    this.hardwareUbication2.hardware_inventory_plate = inventory_plate;
    const url: string = this.activatedRoute.snapshot['_routerState'].url;

    if (this.hardwareUbication2.hardware_inventory_plate == "" || this.hardwareUbication2.return_date == "") {
      Swal.fire({
        icon: 'warning',
        text: 'Debe llenar todos los campos que tienen (*)',
        confirmButtonColor: '#00aa99'
      });
    } else {
      if (this.hardwareUbication2.return_date > this.hardwareUbication.assignment_date) {
        if (url.indexOf('computer') >= 0) {
          Swal.fire({
            title: 'Espere un momento',
            text: 'Estamos realizando la consulta',
            timerProgressBar: true,
            onBeforeOpen: () => {
              Swal.showLoading()
            }
          });
          this.hardwareService.deallocateComputer(this.hardwareUbication, this.hardwareUbication2)
            .subscribe(
              res => {
                console.log(res);
                document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

                this.connectionLost = res;
                if (this.connectionLost.code == 'ETIMEDOUT') {
                  console.log('Conexión perdida. Reconectando...');
                  this.deallocateHardwareForUser();
                } else {
                  Swal.fire({
                    title: 'Hecho',
                    text: 'El computador se desvinculó con exito',
                    icon: 'success',
                    confirmButtonColor: '#00aa99'
                  }).then((result) => {
                    if (result.value) {
                      location.reload();
                    }
                  });
                }
              },
              err => console.error(err)
            );
        } else {
          if (url.indexOf('ups') >= 0) {
            Swal.fire({
              title: 'Espere un momento',
              text: 'Estamos realizando la consulta',
              timerProgressBar: true,
              onBeforeOpen: () => {
                Swal.showLoading()
              }
            });
            this.hardwareService.deallocateUps(this.hardwareUbication, this.hardwareUbication2)
              .subscribe(
                res => {
                  console.log(res);
                  document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

                  this.connectionLost = res;
                  if (this.connectionLost.code == 'ETIMEDOUT') {
                    console.log('Conexión perdida. Reconectando...');
                    this.deallocateHardwareForUser();
                  } else {
                    Swal.fire({
                      title: 'Hecho',
                      text: 'La UPS se desvinculó con exito',
                      icon: 'success',
                      confirmButtonColor: '#00aa99'
                    }).then((result) => {
                      if (result.value) {
                        location.reload();
                      }
                    });
                  }
                },
                err => console.error(err)
              );
          } else {
            Swal.fire({
              title: 'Espere un momento',
              text: 'Estamos realizando la consulta',
              timerProgressBar: true,
              onBeforeOpen: () => {
                Swal.showLoading()
              }
            });
            this.hardwareService.deallocatePeripheral(this.hardwareUbication, this.hardwareUbication2)
              .subscribe(
                res => {
                  console.log(res);
                  document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

                  this.connectionLost = res;
                  if (this.connectionLost.code == 'ETIMEDOUT') {
                    console.log('Conexión perdida. Reconectando...');
                    this.deallocateHardwareForUser();
                  } else {
                    Swal.fire({
                      title: 'Hecho',
                      text: 'El Periférico se desvinculó con exito',
                      icon: 'success',
                      confirmButtonColor: '#00aa99'
                    }).then((result) => {
                      if (result.value) {
                        location.reload();
                      }
                    });
                  }
                },
                err => console.error(err)
              );
          }
        }
      } else {
        Swal.fire({
          icon: 'warning',
          text: 'La fecha de devolución deber ser posterior a la fecha de asignación',
          confirmButtonColor: '#00aa99'
        });
      }
    }
  }

}
