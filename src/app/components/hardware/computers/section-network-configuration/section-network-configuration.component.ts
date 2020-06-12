import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";

//Interfaces
import { ConnectionLost } from 'src/app/interfaces/ConnectionLost';
import { Computer } from "../../../../interfaces/Computer";

//services
import { HardwareService } from "../../../../services/hardware/hardware.service";

@Component({
  selector: 'app-section-network-configuration',
  templateUrl: './section-network-configuration.component.html',
  styleUrls: ['./section-network-configuration.component.css']
})
export class SectionNetworkConfigurationComponent implements OnInit {

  editConfigureNetwork: boolean = false;
  connectionLost: ConnectionLost;
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
  };
  inNetwork: string = "";

  constructor(private hardwareService: HardwareService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getComputer();
  }

  getComputer() {
    let inventory_plate = this.activatedRoute.snapshot.params.id;
    this.hardwareService.getComputer(inventory_plate)
      .subscribe(
        res => {
          console.log(res);

          this.connectionLost = res;
          if (this.connectionLost.code == 'ETIMEDOUT') {
            console.log('Conexión perdida. Reconectando...');
            this.getComputer();
          } else {
            this.computer = res[0];
            if (this.computer.ip_direction != null) {
              this.inNetwork = 'Si';
            } else {
              this.inNetwork = 'No';
            }
            console.log(this.computer.ip_direction);
          }
        },
        err => console.error(err)
      );
  }

  showUpdateNetworkConfiguration() {
    this.editConfigureNetwork = true;
  }

  updateNetworkConfiguration(): void {
    if (this.computer.name_machine == "" || this.computer.ip_direction == "" || this.computer.mac_direction == "" || this.computer.internet_type_connection == "") {
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
      this.hardwareService.uptadeNetworkConfiguration(this.computer)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.updateNetworkConfiguration();
            } else {
              Swal.fire({
                title: 'Hecho',
                text: 'La configuración de red se modificó con exito',
                icon: 'success',
                confirmButtonColor: '#00aa99'
              }).then((result) => {
                if (result.value) {
                  this.getComputer();
                  this.editConfigureNetwork = false;
                }
              });
            }
          },
          err => console.error(err)
        );
    }
  }

}
