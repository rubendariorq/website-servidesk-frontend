import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import Swal from "sweetalert2";

//Interfaces
import { Computer } from "../../../../interfaces/Computer";
import { ConnectionLost } from "../../../../interfaces/ConnectionLost";

//Services
import { HardwareService } from "../../../../services/hardware/hardware.service";

@Component({
  selector: 'app-computer-add',
  templateUrl: './computer-add.component.html',
  styleUrls: ['./computer-add.component.css']
})
export class ComputerAddComponent implements OnInit {

  title = 'Computadores'
  connectionLost: ConnectionLost;
  computer: Computer = {
    inventory_plate: "",
    serial: "",
    cost: 0,
    months_warranty: 0,
    brand: "",
    creation_date: "",
    status: "",
    buy_date: "",
    provider: "",
    model: "",
    type_computer: "",
    processor: "",
    speed_processor: "",
    hard_drive: "",
    technology_hard_drive: "",
    memory: "",
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

  constructor(private hardwareService: HardwareService, private router: Router) { }

  ngOnInit() {
  }

  createComputer(): void {
    if (this.computer.buy_date == "" || this.computer.months_warranty == 0 || this.computer.inventory_plate == "" || this.computer.type_computer == "" || this.computer.serial == "" || this.computer.brand == "" || this.computer.model == "" || this.computer.processor == "" || this.computer.speed_processor == "" || this.computer.technology_hard_drive == "" || this.computer.hard_drive == "" || this.computer.type_memory == "" || this.computer.memory == "" || this.computer.brand_monitor == "" || this.computer.model_monitor == "" || this.computer.inch_monitor == 0 || this.computer.serial_monitor == "" || this.computer.brand_network_card == "" || this.computer.speed_network_card == "" || this.computer.drive == "" || this.computer.cd_rom == "" || this.computer.dvd == "" || this.computer.card_reader_driver == "" || this.computer.tape_backup == "" || this.computer.external_hard_drive == "" || this.computer.keyboard_connection == "" || this.computer.mouse_connection == "") {
      Swal.fire({
        icon: 'warning',
        text: 'Debe llenar todos los campos que tienen (*)',
        confirmButtonColor: '#00aa99'
      });
    } else {
      this.computer.hardware_inventory_plate = this.computer.inventory_plate;
      this.computer.status = "Actualizado";

      Swal.fire({
        title: 'Espere un momento',
        text: 'Estamos realizando la consulta',
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      });
      this.hardwareService.createDependencie(this.computer)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.createComputer();
            }else{
              if(this.connectionLost.message.indexOf("Duplicate") >= 0){
                Swal.fire({
                  icon: 'warning',
                  text: 'La placa de inventario digitada ya existe',
                  confirmButtonColor: '#00aa99'
                });
              }else{
                Swal.fire({
                  title: 'Hecho',
                  text: 'La dependencia se creó con exito',
                  icon: 'success',
                  confirmButtonColor: '#00aa99'
                }).then((result) => {
                  if (result.value) {
                    this.router.navigate(['/hardware']);
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
