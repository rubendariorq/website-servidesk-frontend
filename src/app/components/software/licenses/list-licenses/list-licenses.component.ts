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

}
