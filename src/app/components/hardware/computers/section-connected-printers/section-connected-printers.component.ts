import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { ActivatedRoute } from "@angular/router";

//Interfaces
import { ConnectionLost } from 'src/app/interfaces/ConnectionLost';
import { Printers } from "../../../../interfaces/Printers";
import { HardwareUbications } from 'src/app/interfaces/HardwareUbications';

//Services
import { HardwareService } from "../../../../services/hardware/hardware.service";

@Component({
  selector: 'app-section-connected-printers',
  templateUrl: './section-connected-printers.component.html',
  styleUrls: ['./section-connected-printers.component.css']
})
export class SectionConnectedPrintersComponent implements OnInit {

  connectionLost: ConnectionLost;
  printers: any = [];
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

  constructor(private hardwareServices: HardwareService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getPrintersForComputer();
  }

  getPrintersForComputer() {
    let inventory_plate = this.activatedRoute.snapshot.params.id;

    this.hardwareServices.getPrintersForComputer(inventory_plate)
      .subscribe(
        res => {
          console.log(res);

          this.connectionLost = res;
          if (this.connectionLost.code == 'ETIMEDOUT') {
            console.log('Conexión perdida. Reconectando...');
            this.getPrintersForComputer();
          } else {
            this.printers = res;
          }
        },
        err => console.error(err)
      );
  }

  deleteConnectionPrinter(printer: Printers): void {
    Swal.fire({
      icon: 'warning',
      title: '¿Desea desconectar el periférico del computador?',
      text: 'No podrá deshacer esta acción más adelante',
      showCancelButton: true,
      confirmButtonColor: '#00aa99',
      cancelButtonColor: '#ED213A',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        if (printer.connection_type == 'Local') {

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

          this.hardwareServices.getPrintersUbication(printer.inventory_plate)
            .subscribe(
              res => {
                console.log(res);

                this.connectionLost = res;
                if (this.connectionLost.code == 'ETIMEDOUT') {
                  console.log('Conexión perdida. Reconectando...');
                  this.deleteConnectionPrinter(printer);
                } else {
                  this.hardwareUbications = res[0];
                  this.hardwareUbications.return_date = today;

                  let aux = "";
                  let date = [];
                  if (this.hardwareUbications.assignment_date != null) {
                    aux = this.hardwareUbications.assignment_date;
                    date = aux.split('T');
                    this.hardwareUbications.assignment_date = date[0];
                  }

                  Swal.fire({
                    title: 'Espere un momento',
                    text: 'Estamos realizando la consulta',
                    timerProgressBar: true,
                    onBeforeOpen: () => {
                      Swal.showLoading()
                    }
                  });
                  this.hardwareServices.deallocatePeripheral(this.hardwareUbications, this.hardwareUbications)
                    .subscribe(
                      res => {
                        console.log(res);
                        document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

                        this.connectionLost = res;
                        if (this.connectionLost.code == 'ETIMEDOUT') {
                          console.log('Conexión perdida. Reconectando...');
                          this.deleteConnectionPrinter(printer);
                        } else {
                          this.printers = [];
                          this.getPrintersForComputer();
                        }
                      },
                      err => console.error(err)
                    );

                  console.log('---');
                  console.log(this.hardwareUbications);
                  console.log(printer);
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
          this.hardwareServices.disconnectPeripheral(printer.inventory_plate)
            .subscribe(
              res => {
                console.log(res);
                document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

                this.connectionLost = res;
                if (this.connectionLost.code == 'ETIMEDOUT') {
                  console.log('Conexión perdida. Reconectando...');
                  this.deleteConnectionPrinter(printer);
                } else {
                  this.printers = [];
                  this.getPrintersForComputer();
                }
              },
              err => console.error(err)
            );
        }
      }
    });
  }
}
