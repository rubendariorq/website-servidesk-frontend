import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { ActivatedRoute } from "@angular/router";

//Interfaces
import { ConnectionLost } from 'src/app/interfaces/ConnectionLost';
import { PeripheralForComputer } from 'src/app/interfaces/PeripheralForConputer';

//Services
import { DependenciesService } from "../../../../services/dependencies.service";
import { UserService } from "../../../../services/user/user.service";
import { HardwareService } from "../../../../services/hardware/hardware.service";
import { HardwareUbications } from 'src/app/interfaces/HardwareUbications';

@Component({
  selector: 'app-section-assign-peripheral',
  templateUrl: './section-assign-peripheral.component.html',
  styleUrls: ['./section-assign-peripheral.component.css']
})
export class SectionAssignPeripheralComponent implements OnInit {

  connectionLost: ConnectionLost;
  hardwareUbications: HardwareUbications = {
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
  peripheralForUser: PeripheralForComputer = {
    peripherals_hardware_inventory_plate: "",
    computers_hardware_inventory_plate: "",
    assignment_date: "",
    connection_type: ""
  }
  dependencies: any = [];
  users: any = [];
  computers: any = [];
  comp = {
    allocation_status: "",
    assignment_date: "",
    brand: "",
    buy_date: "",
    cost: 0,
    creation_date_hv: "",
    dependencies_id_dependencie: 0,
    email: "",
    failed_attempts: 0,
    hardware_inventory_plate: "",
    id_dependencie: 0,
    id_user: 0,
    inventory_plate: "",
    model: "",
    months_warranty: 0,
    name: "",
    name_dependencie: "",
    password: "",
    password_changed_date: "",
    provider: "",
    return_date: "",
    serial: "",
    status: "",
    type_hardware: "",
    type_user: "",
    users_id_user: 0
  };
  selectDependencie: string = "";
  selectUsers: string = "";
  selectComputers: string = "";

  constructor(private dependenciesService: DependenciesService, private userService: UserService, private hardwareService: HardwareService, private activatedRoute: ActivatedRoute) { }

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

  getUsersForDependencie(dependencie: string): void {
    var selectUser = <HTMLInputElement>document.getElementById("selectUser");
    var selectComputer = <HTMLInputElement>document.getElementById("selectComputers");

    if (dependencie != "") {
      this.userService.getUsersForDependencie(dependencie)
        .subscribe(
          res => {
            console.log(res);

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.getUsersForDependencie(dependencie);
            } else {
              this.users = res;
            }
            selectUser.disabled = false;
          },
          err => console.error(err)
        );
    } else {
      selectUser.disabled = true;
      selectComputer.disabled = true;
    }
    this.selectUsers = "";
    this.selectComputers = "";
  }

  getComputerForUser(idUser: string): void {
    var selectComputer = <HTMLInputElement>document.getElementById("selectComputers");

    if (idUser != "") {
      this.hardwareService.getComputersForUser(idUser)
        .subscribe(
          res => {
            console.log(res);

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.getComputerForUser(idUser);
            } else {
              this.computers = res;
            }
            selectComputer.disabled = false;
          },
          err => console.error(err)
        );
    } else {
      selectComputer.disabled = true;
    }
    this.selectComputers = "";
  }

  showInfoComputer(inventory_plate: string): void {

    let i = 0;
    while (i < this.computers.length) {
      if (this.computers[i].inventory_plate == inventory_plate) {
        this.comp = this.computers[i];
        this.peripheralForUser.computers_hardware_inventory_plate = this.comp.inventory_plate;
      }
      i++;
    }
  }

  savePeripheralForUser(): void {
    let id = this.activatedRoute.snapshot.params.id;
    this.peripheralForUser.peripherals_hardware_inventory_plate = id;

    if (this.peripheralForUser.computers_hardware_inventory_plate == "" || this.peripheralForUser.connection_type == "") {
      Swal.fire({
        icon: 'warning',
        text: 'Debe llenar todos los campos que tienen (*)',
        confirmButtonColor: '#00aa99'
      });
    } else {
      if (this.peripheralForUser.connection_type == "Local") {
        Swal.fire({
          title: 'Espere un momento',
          text: 'Estamos realizando la consulta',
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading()
          }
        });
        this.hardwareService.getUserForComputer(this.peripheralForUser.computers_hardware_inventory_plate)
          .subscribe(
            res => {
              console.log(res);

              this.connectionLost = res;
              if (this.connectionLost.code == 'ETIMEDOUT') {
                console.log('Conexión perdida. Reconectando...');
                this.savePeripheralForUser();
              } else {
                this.hardwareUbications = res[0];

                this.hardwareUbications.hardware_inventory_plate = this.peripheralForUser.peripherals_hardware_inventory_plate;

                let f = new Date();
                let today = "";
                let year = f.getFullYear();
                let month = (f.getMonth() + 1);
                let monthAux = "";
                let day = f.getDate();

                if (month < 10) {
                  monthAux = '0' + month;
                }

                today = year + "-" + monthAux + "-" + day;

                this.hardwareUbications.assignment_date = today;

                this.hardwareService.addPeripheralsUbicationAndLinkComputer(this.hardwareUbications, this.peripheralForUser)
                  .subscribe(
                    res => {
                      console.log(res);
                      document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

                      this.connectionLost = res;
                      if (this.connectionLost.code == 'ETIMEDOUT') {
                        console.log('Conexión perdida. Reconectando...');
                        this.savePeripheralForUser();
                      } else {
                        if (this.connectionLost.message.indexOf("Duplicate") >= 0 || this.connectionLost.message.indexOf("duplicate") >= 0) {
                          Swal.fire({
                            icon: 'warning',
                            text: 'El periferico ya esta asociado a el computador',
                            confirmButtonColor: '#00aa99'
                          });
                        } else {
                          Swal.fire({
                            title: 'Hecho',
                            text: 'El periférico se vinculó al computador con exito',
                            icon: 'success',
                            confirmButtonColor: '#00aa99'
                          }).then((result) => {
                            if (result.value) {
                              console.log('hi');
                              location.reload();
                            }
                          });
                        }
                      }
                    },
                    err => console.error(err)
                  );
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
        this.hardwareService.addPeripheralsUbication(this.peripheralForUser)
          .subscribe(
            res => {
              console.log(res);

              this.connectionLost = res;
              if (this.connectionLost.code == 'ETIMEDOUT') {
                console.log('Conexión perdida. Reconectando...');
                this.savePeripheralForUser();
              } else {
                if (this.connectionLost.message.indexOf("Duplicate") >= 0 || this.connectionLost.message.indexOf("duplicate") >= 0) {
                  Swal.fire({
                    icon: 'warning',
                    text: 'El periferico ya esta asociado a el computador',
                    confirmButtonColor: '#00aa99'
                  });
                } else {
                  Swal.fire({
                    title: 'Hecho',
                    text: 'El periférico se vinculó al computador con exito',
                    icon: 'success',
                    confirmButtonColor: '#00aa99'
                  }).then((result) => {
                    if (result.value) {
                      console.log('hi');
                      location.reload();
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

}
