import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";

//Interfaces
import { Software } from "../../../interfaces/Software";
import { ConnectionLost } from 'src/app/interfaces/ConnectionLost';

//Services
import { SoftwareService } from "../../../services/software/software.service";

@Component({
  selector: 'app-list-software',
  templateUrl: './list-software.component.html',
  styleUrls: ['./list-software.component.css']
})
export class ListSoftwareComponent implements OnInit {

  title: string = "Software";
  connectionLost: ConnectionLost;
  software: Software;

  constructor(private softwareService: SoftwareService) { }

  ngOnInit() {
    this.getAllSoftware();
  }

  getAllSoftware(): void {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos realizando la consulta',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    this.softwareService.getAllSoftware()
      .subscribe(
        res => {
          console.log(res);
          document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

          this.connectionLost = res;
          if (this.connectionLost.code == 'ETIMEDOUT') {
            console.log('Conexión perdida. Reconectando...');
            this.getAllSoftware();
          } else {
            if (res[0] == undefined) {
              Swal.fire({
                icon: 'warning',
                title: 'Aviso',
                text: 'No hay software registrado',
                confirmButtonColor: '00aa99'
              })
            } else {
              this.software = res;
            }
          }
        },
        err => console.error(err)
      );
  }

}
