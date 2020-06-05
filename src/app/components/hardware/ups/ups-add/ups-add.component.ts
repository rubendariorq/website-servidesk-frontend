import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";

//Interfaces
import { Ups } from "../../../../interfaces/Ups";
import { ConnectionLost } from "../../../../interfaces/ConnectionLost";

//Services
import { HardwareService } from "../../../../services/hardware/hardware.service";

@Component({
  selector: 'app-ups-add',
  templateUrl: './ups-add.component.html',
  styleUrls: ['./ups-add.component.css']
})
export class UpsAddComponent implements OnInit {

  title = 'Hardware';
  connectionLost: ConnectionLost;
  edit: boolean = false;
  view: boolean = false;
  ups: Ups = {
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
    capacity: "",
    hardware_inventory_plate: ""
  }

  constructor(private hardwareService: HardwareService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getUps();
    const url: string = this.activatedRoute.snapshot['_routerState'].url;
    if(url.indexOf('view') >= 0){
      this.view = true;
    }
  }

  createUps(): void {
    if (this.ups.buy_date == "" || this.ups.months_warranty == 0 || this.ups.inventory_plate == "" || this.ups.serial == "" || this.ups.brand == "" || this.ups.model == "" || this.ups.capacity == "") {
      Swal.fire({
        icon: 'warning',
        text: 'Debe llenar todos los campos que tienen (*)',
        confirmButtonColor: '#00aa99'
      });
    } else {
      this.ups.hardware_inventory_plate = this.ups.inventory_plate;
      this.ups.allocation_status = "Sin asignar";
      this.ups.type_hardware = "Ups";

      Swal.fire({
        title: 'Espere un momento',
        text: 'Estamos realizando la consulta',
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      });
      this.hardwareService.createUps(this.ups)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.createUps();
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
                  text: 'La UPS se registró con exito',
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

  getUps(): void{
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
      this.hardwareService.getUps(params.id)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.getUps();
            } else {
              if (res[0] == undefined) {
                this.router.navigate(["/hardware"]);
                Swal.fire({
                  icon: 'warning',
                  title: 'Aviso',
                  text: 'La Ups no existe',
                  confirmButtonColor: '00aa99'
                });
              } else {
                this.ups = res[0];

                let aux = this.ups.buy_date;
                let date = aux.split('T');
                this.ups.buy_date = date[0];
              }
            }
          },
          err => console.error(err)
        );
    }
  }

  updateUps(): void {
    const inventory_plate = this.activatedRoute.snapshot.params.id;

    if (this.ups.buy_date == "" || this.ups.months_warranty == 0 || this.ups.inventory_plate == "" || this.ups.serial == "" || this.ups.brand == "" || this.ups.model == "" || this.ups.capacity == "") {
      Swal.fire({
        icon: 'warning',
        text: 'Debe llenar todos los campos que tienen (*)',
        confirmButtonColor: '#00aa99'
      });
    } else {
      this.ups.hardware_inventory_plate = this.ups.inventory_plate;
      this.ups.allocation_status = "Sin asignar";
      this.ups.type_hardware = "Ups";

      Swal.fire({
        title: 'Espere un momento',
        text: 'Estamos realizando la consulta',
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      });
      this.hardwareService.uptadeUps(inventory_plate ,this.ups)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.createUps();
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
                  text: 'La UPS se modificó con exito',
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
