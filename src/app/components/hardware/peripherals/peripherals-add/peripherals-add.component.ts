import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";

//Interfaces
import { Peripheral } from "../../../../interfaces/Peripheral";
import { ConnectionLost } from "../../../../interfaces/ConnectionLost";

//Services
import { HardwareService } from "../../../../services/hardware/hardware.service";

@Component({
  selector: 'app-peripherals-add',
  templateUrl: './peripherals-add.component.html',
  styleUrls: ['./peripherals-add.component.css']
})
export class PeripheralsAddComponent implements OnInit {

  title = 'Hardware';
  connectionLost: ConnectionLost;
  edit: boolean = false;
  peripheral: Peripheral = {
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
    type_hardware: "",
    type_peripheral: "",
    hardware_inventory_plate: ""
  }

  constructor(private hardwareService: HardwareService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getPeripheral();
  }

  createPeripheral(): void {
    if (this.peripheral.buy_date == "" || this.peripheral.months_warranty == 0 || this.peripheral.inventory_plate == "" || this.peripheral.serial == "" || this.peripheral.brand == "" || this.peripheral.model == "" || this.peripheral.type_peripheral == "") {
      Swal.fire({
        icon: 'warning',
        text: 'Debe llenar todos los campos que tienen (*)',
        confirmButtonColor: '#00aa99'
      });
    } else {
      this.peripheral.hardware_inventory_plate = this.peripheral.inventory_plate;
      this.peripheral.status = "Actualizado";
      this.peripheral.type_hardware = "Periferico";

      Swal.fire({
        title: 'Espere un momento',
        text: 'Estamos realizando la consulta',
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      });
      this.hardwareService.createPeripheral(this.peripheral)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.createPeripheral();
            } else {
              if (this.connectionLost.message.indexOf("Duplicate") >= 0) {
                Swal.fire({
                  icon: 'warning',
                  text: 'La placa de inventario digitada ya existe',
                  confirmButtonColor: '#00aa99'
                });
              } else {
                Swal.fire({
                  title: 'Hecho',
                  text: 'El periférico se registró con exito',
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

  getPeripheral(): void{
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
      this.hardwareService.getPeripheral(params.id)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.getPeripheral();
            } else {
              if (res[0] == undefined) {
                this.router.navigate(["/hardware"]);
                Swal.fire({
                  icon: 'warning',
                  title: 'Aviso',
                  text: 'El periférico no existe',
                  confirmButtonColor: '00aa99'
                });
              } else {
                this.peripheral = res[0];

                let aux = this.peripheral.buy_date;
                let date = aux.split('T');
                this.peripheral.buy_date = date[0];
              }
            }
          },
          err => console.error(err)
        );
    }
  }

  updatePeripheral(): void {
    const inventoryPlate = this.activatedRoute.snapshot.params.id;

    if (this.peripheral.buy_date == "" || this.peripheral.months_warranty == 0 || this.peripheral.inventory_plate == "" || this.peripheral.serial == "" || this.peripheral.brand == "" || this.peripheral.model == "" || this.peripheral.type_peripheral == "") {
      Swal.fire({
        icon: 'warning',
        text: 'Debe llenar todos los campos que tienen (*)',
        confirmButtonColor: '#00aa99'
      });
    } else {
      this.peripheral.hardware_inventory_plate = this.peripheral.inventory_plate;
      this.peripheral.status = "Actualizado";
      this.peripheral.type_hardware = "Periferico";

      Swal.fire({
        title: 'Espere un momento',
        text: 'Estamos realizando la consulta',
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      });
      this.hardwareService.uptadePeripheral(inventoryPlate, this.peripheral)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.createPeripheral();
            } else {
              if (this.connectionLost.message.indexOf("Duplicate") >= 0 || this.connectionLost.message.indexOf("duplicate") >= 0) {
                Swal.fire({
                  icon: 'warning',
                  text: 'La placa de inventario digitada ya existe',
                  confirmButtonColor: '#00aa99'
                });
              } else {
                Swal.fire({
                  title: 'Hecho',
                  text: 'El periférico se modificó con exito',
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
