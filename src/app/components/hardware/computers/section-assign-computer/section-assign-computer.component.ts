import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";

//Interfaces
import { ConnectionLost } from 'src/app/interfaces/ConnectionLost';
import { HardwareUbications } from 'src/app/interfaces/HardwareUbications';
import { User } from 'src/app/interfaces/User';

//Services
import { DependenciesService } from "../../../../services/dependencies.service";
import { UserService } from "../../../../services/user/user.service";
import { Computer } from 'src/app/interfaces/Computer';
import { HardwareService } from "../../../../services/hardware/hardware.service";

@Component({
  selector: 'app-section-assign-computer',
  templateUrl: './section-assign-computer.component.html',
  styleUrls: ['./section-assign-computer.component.css']
})
export class SectionAssignComputerComponent implements OnInit {

  connectionLost: ConnectionLost;
  user: User;
  dependencies: any = [];
  users: any = [];
  selectDependencie: string = "";
  selectUsers: string = "";
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
  computer: Computer = {
    inventory_plate: "",
    serial: "",
    cost: 0,
    months_warranty: 0,
    brand: "",
    creation_date: "",
    allocation_status: "",
    buy_date: "",
    provider: "",
    model: "",
    type_hardware: "",
    type_computer: "",
    processor: "",
    processor_unit_measure: "GHz",
    speed_processor: 0,
    hard_drive: 0,
    hard_drive_unit_measure: "GB",
    technology_hard_drive: "",
    memory: 0,
    memory_unit_measure: "GB",
    type_memory: "",
    brand_monitor: "",
    model_monitor: "",
    inch_monitor: 0,
    serial_monitor: "",
    brand_network_card: "",
    speed_network_card: "",
    drive: "",
    cd_rom: "",
    dvd: "",
    card_reader_driver: "",
    tape_backup: "",
    external_hard_drive: "",
    keyboard_connection: "",
    mouse_connection: "",
    mac_direction: "",
    ip_direction: "",
    name_machine: "",
    internet_type_connection: "",
    internet_provider: "",
    observations: "",
    hardware_inventory_plate: ""
  }

  constructor(private dependenciesService: DependenciesService, private userService: UserService, private activatedRoute: ActivatedRoute, private hardwareService: HardwareService) { }

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
    var selectUser = <HTMLInputElement>document.getElementById("selectUsers");

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
    }
    this.selectUsers = "";
  }

  getUser(name: string): void {
    this.userService.getUserForName(name)
      .subscribe(
        res => {
          console.log(res);

          this.connectionLost = res;
          if (this.connectionLost.code == 'ETIMEDOUT') {
            console.log('Conexión perdida. Reconectando...');
            this.getUser(name);
          } else {
            this.user = res[0];
            this.hardwareUbications.id_user = this.user.id_user;
          }
        },
        err => console.error(err)
      );
  }

  saveHardwareForUser(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.hardwareUbications.hardware_inventory_plate = id;
    this.computer.hardware_inventory_plate = id;

    if (this.hardwareUbications.id_user == 0 || this.hardwareUbications.assignment_date == "" || this.computer.name_machine == "" || this.computer.ip_direction == "" || this.computer.mac_direction == "" || this.computer.internet_type_connection == "" || this.computer.internet_provider == "") {
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
      this.hardwareService.addUbicationComputer(this.hardwareUbications, this.computer)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.saveHardwareForUser();
            } else {
              location.reload();
            }
          },
          err => console.error(err)
        );
    }
  }

}
