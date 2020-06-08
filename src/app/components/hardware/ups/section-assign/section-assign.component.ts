import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

//Interfaces
import { ConnectionLost } from 'src/app/interfaces/ConnectionLost';
import { User } from 'src/app/interfaces/User';
import { HardwareUbications } from 'src/app/interfaces/HardwareUbications';

//Services
import { DependenciesService } from "../../../../services/dependencies.service";
import { UserService } from "../../../../services/user/user.service";
import { HardwareService } from "../../../../services/hardware/hardware.service";

@Component({
  selector: 'app-section-assign',
  templateUrl: './section-assign.component.html',
  styleUrls: ['./section-assign.component.css']
})
export class SectionAssignComponent implements OnInit {

  selectDependencie: string = "";
  selectUsers: string = "";
  connectionLost: ConnectionLost;
  dependencies = [];
  users = [];
  user: User;
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

  constructor(private dependenciesService: DependenciesService, private userService: UserService, private activatedRoute: ActivatedRoute, private hardwareService: HardwareService, private router: Router) { }

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
    }else{
      selectUser.disabled = true;
      this.selectUsers = "";
    }
  }

  getUser(name: string): void{
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

  saveHardwareForUser(): void{
    const id = this.activatedRoute.snapshot.params.id;
    this.hardwareUbications.hardware_inventory_plate = id;

    if(this.hardwareUbications.id_user == 0 || this.hardwareUbications.assignment_date == ""){
      Swal.fire({
        icon: 'warning',
        text: 'Debe llenar todos los campos que tienen (*)',
        confirmButtonColor: '#00aa99'
      });
    }else{
      Swal.fire({
        title: 'Espere un momento',
        text: 'Estamos realizando la consulta',
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      });
      this.hardwareService.addUbicationHardware(this.hardwareUbications)
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
