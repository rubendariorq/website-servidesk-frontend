import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";

//Interfaces
import { ConnectionLost } from 'src/app/interfaces/ConnectionLost';
import { Licenses } from 'src/app/interfaces/Licenses';

//Services
import { LicenseService } from "../../../../services/license/license.service";

@Component({
  selector: 'app-list-licenses',
  templateUrl: './list-licenses.component.html',
  styleUrls: ['./list-licenses.component.css']
})
export class ListLicensesComponent implements OnInit {

  title: string = "Licencias";
  connectionLost: ConnectionLost;
  licenses: Licenses;

  constructor(private licenseService: LicenseService) { }

  ngOnInit() {
    this.getLicenses();
  }

  getLicenses(): void {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos realizando la consulta',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    this.licenseService.getLicenses()
      .subscribe(
        res => {
          console.log(res);
          document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

          this.connectionLost = res;
          if (this.connectionLost.code == 'ETIMEDOUT') {
            console.log('Conexión perdida. Reconectando...');
            this.getLicenses();
          } else {
            if (res[0] == undefined) {
              Swal.fire({
                icon: 'warning',
                title: 'Aviso',
                text: 'No hay licencias registradas',
                confirmButtonColor: '00aa99'
              })
            } else {
              this.licenses = res;
            }
          }
        },
        err => console.error(err)
      );
  }

  deleteLicense(id_license: number): void {
    Swal.fire({
      icon: 'warning',
      title: '¿Desea eliminar la licencia?',
      text: 'Si elimina la licencia no podra recuperarla más adelante',
      showCancelButton: true,
      confirmButtonColor: '#00aa99',
      cancelButtonColor: '#ED213A',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Espere un momento',
          text: 'Estamos realizando la consulta',
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading()
          }
        });
        this.licenseService.deleteLicense(id_license)
          .subscribe(
            res => {
              console.log(res);

              this.connectionLost = res;
              document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();
              if (this.connectionLost.code == 'ETIMEDOUT') {
                console.log('Conexión perdida. Reconectando...');
                this.deleteLicense(id_license);
              } else {
                Swal.fire({
                  icon: 'success',
                  title: 'Hecho',
                  text: 'La licencia se ha borrado con éxito',
                  confirmButtonColor: '#00aa99'
                }).then(result => {
                  if (result.value) {
                    this.getLicenses();
                  }
                });
              }
            },
            err => console.error(err)
          );
      }
    });
  }

}
