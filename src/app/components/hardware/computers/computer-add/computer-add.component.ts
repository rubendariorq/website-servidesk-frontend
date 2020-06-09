import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
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
  edit: boolean = false;
  view: boolean = false;
  allocationStatus: boolean = false;
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

  constructor(private hardwareService: HardwareService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getComputer();
    const url: string = this.activatedRoute.snapshot['_routerState'].url;
    if(url.indexOf('view') >= 0){
      this.view = true;
    }
  }

  createComputer(): void {
    if (this.computer.buy_date == "" || this.computer.months_warranty == 0 || this.computer.inventory_plate == "" || this.computer.type_computer == "" || this.computer.serial == "" || this.computer.brand == "" || this.computer.model == "" || this.computer.processor == "" || this.computer.speed_processor == 0 || this.computer.technology_hard_drive == "" || this.computer.hard_drive == 0 || this.computer.type_memory == "" || this.computer.memory == 0 || this.computer.brand_monitor == "" || this.computer.model_monitor == "" || this.computer.inch_monitor == 0 || this.computer.serial_monitor == "" || this.computer.brand_network_card == "" || this.computer.speed_network_card == "" || this.computer.drive == "" || this.computer.cd_rom == "" || this.computer.dvd == "" || this.computer.card_reader_driver == "" || this.computer.tape_backup == "" || this.computer.external_hard_drive == "" || this.computer.keyboard_connection == "" || this.computer.mouse_connection == "") {
      Swal.fire({
        icon: 'warning',
        text: 'Debe llenar todos los campos que tienen (*)',
        confirmButtonColor: '#00aa99'
      });
    } else {
      this.computer.hardware_inventory_plate = this.computer.inventory_plate;
      this.computer.allocation_status = "Sin asignar";
      this.computer.type_hardware = "Computador";

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
                  text: 'El computador se registró con exito',
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

  getComputer(): void{
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.edit = true;
      Swal.fire({
        title: 'Espere un momento',
        text: 'Estamos realizando la consulta',
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      });
      this.hardwareService.getComputer(params.id)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.getComputer();
            } else {
              if (res[0] == undefined) {
                this.router.navigate(["/hardware"]);
                Swal.fire({
                  icon: 'warning',
                  title: 'Aviso',
                  text: 'El computador no existe',
                  confirmButtonColor: '00aa99'
                });
              } else {
                this.computer = res[0];

                let aux = this.computer.buy_date;
                let date = aux.split('T');
                this.computer.buy_date = date[0];

                if(this.computer.allocation_status == 'Asignado'){
                  this.allocationStatus = true;
                }
              }
            }
          },
          err => console.error(err)
        );
    }
  }

  editComputer():void {
    const inventory_plate = this.activatedRoute.snapshot.params.id;

    if (this.computer.buy_date == "" || this.computer.months_warranty == 0 || this.computer.inventory_plate == "" || this.computer.type_computer == "" || this.computer.serial == "" || this.computer.brand == "" || this.computer.model == "" || this.computer.processor == "" || this.computer.speed_processor == 0 || this.computer.technology_hard_drive == "" || this.computer.hard_drive == 0 || this.computer.type_memory == "" || this.computer.memory == 0 || this.computer.brand_monitor == "" || this.computer.model_monitor == "" || this.computer.inch_monitor == 0 || this.computer.serial_monitor == "" || this.computer.brand_network_card == "" || this.computer.speed_network_card == "" || this.computer.drive == "" || this.computer.cd_rom == "" || this.computer.dvd == "" || this.computer.card_reader_driver == "" || this.computer.tape_backup == "" || this.computer.external_hard_drive == "" || this.computer.keyboard_connection == "" || this.computer.mouse_connection == "") {
      Swal.fire({
        icon: 'warning',
        text: 'Debe llenar todos los campos que tienen (*)',
        confirmButtonColor: '#00aa99'
      });
    } else {
      this.computer.hardware_inventory_plate = this.computer.inventory_plate;
      this.computer.allocation_status = "Sin asignar";
      this.computer.type_hardware = "Computador";

      Swal.fire({
        title: 'Espere un momento',
        text: 'Estamos realizando la consulta',
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      });
      this.hardwareService.uptadeComputer(inventory_plate, this.computer)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.editComputer();
            }else{
              if(this.connectionLost.message.indexOf("Duplicate") >= 0 || this.connectionLost.message.indexOf("duplicate") >= 0){
                Swal.fire({
                  icon: 'warning',
                  text: 'La placa de inventario digitada ya existe',
                  confirmButtonColor: '#00aa99'
                });
              }else{
                Swal.fire({
                  title: 'Hecho',
                  text: 'El computador se modificó con exito',
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
