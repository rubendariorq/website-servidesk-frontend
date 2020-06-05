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
  hardwareUbications: any = [];
  connectionLost: ConnectionLost;
  hardwareAssignment: boolean = false;

  constructor(private hardwareService: HardwareService, private activatedRoute: ActivatedRoute, private userService: UserService, private dependenciesService: DependenciesService) { }

  ngOnInit() {
    this.getUbications();
  }

  getUbications(): void{
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
              }
              i++;
            }
            this.hardwareUbications = arrayAux;
          }
        },
        err => console.error(err)
      );
  }

}
