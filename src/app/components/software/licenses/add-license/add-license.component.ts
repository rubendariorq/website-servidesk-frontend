import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

//Interfaces
import { Licenses } from 'src/app/interfaces/Licenses';
import { ConnectionLost } from 'src/app/interfaces/ConnectionLost';

//Services
import { LicenseService } from "../../../../services/license/license.service";

@Component({
  selector: 'app-add-license',
  templateUrl: './add-license.component.html',
  styleUrls: ['./add-license.component.css']
})
export class AddLicenseComponent implements OnInit {

  connectionLost: ConnectionLost;
  title: string = "Licencias";
  license: Licenses = {
    id_license: 0,
    serial_code: "",
    months_validity: 0,
    cost: 0,
    free_commercial: "",
    client_server: "",
    software: ""
  };
  edit: boolean = false;

  constructor(private licenseService: LicenseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getLicense();
  }

  createLicense(): void {
    if (this.license.serial_code == "" || this.license.free_commercial == "" || this.license.client_server == "" || this.license.software == "") {
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
      this.licenseService.addLicense(this.license)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.createLicense();
            } else {

              Swal.fire({
                title: 'Hecho',
                text: 'La licencia se registró con exito',
                icon: 'success',
                confirmButtonColor: '#00aa99'
              }).then((result) => {
                if (result.value) {
                  this.router.navigate(['/licenses']);
                }
              });
            }
          },
          err => console.error(err)
        );
    }
  }

  getLicense(): void {
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
      this.licenseService.getLicense(params.id)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.getLicense();
            } else {
              if (res[0] == undefined) {
                this.router.navigate(["/licenses"]);
                Swal.fire({
                  icon: 'warning',
                  title: 'Aviso',
                  text: 'La licencia no existe',
                  confirmButtonColor: '00aa99'
                });
              } else {
                this.license = res[0];
              }
            }
          },
          err => console.error(err)
        );
    }
  }

  updateLicense(): void {
    if (this.license.serial_code == "" || this.license.free_commercial == "" || this.license.client_server == "" || this.license.software == "") {
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
      this.licenseService.updateLicense(this.license)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.updateLicense();
            } else {
              Swal.fire({
                title: 'Hecho',
                text: 'La licencia se modificó con exito',
                icon: 'success',
                confirmButtonColor: '#00aa99'
              }).then((result) => {
                if (result.value) {
                  this.router.navigate(['/licenses']);
                }
              });

            }
          },
          err => console.error(err)
        );
    }
  }

}
