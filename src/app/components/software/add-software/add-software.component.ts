import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import Swal from "sweetalert2";

//Interfaces
import { Software } from "../../../interfaces/Software";
import { ConnectionLost } from 'src/app/interfaces/ConnectionLost';

//Services
import { SoftwareService } from "../../../services/software/software.service";

@Component({
  selector: 'app-add-software',
  templateUrl: './add-software.component.html',
  styleUrls: ['./add-software.component.css']
})
export class AddSoftwareComponent implements OnInit {

  title: string = "Software";
  connectionLost: ConnectionLost;
  software: Software = {
    id_software: 0,
    name_software: "",
    version: "",
    status_software: "",
    development_information: "",
    support: "",
    plataform: "",
    development_language: "",
    provider: "",
    software_property: "",
    code_property: "",
    status_support: "",
    cost_maintenance: 0,
    contractual_use_restriction: ""
  }

  constructor(private softwareService: SoftwareService, private router: Router) { }

  ngOnInit() {
  }

  createSoftware(): void {
    if (this.software.name_software == "" || this.software.version == "" || this.software.status_software == "" || this.software.development_information == "" || this.software.support == "" || this.software.status_support == "" || this.software.provider == "" || this.software.software_property == "" || this.software.code_property == "" || this.software.plataform == "" || this.software.cost_maintenance == 0) {
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
      this.softwareService.createSoftware(this.software)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.createSoftware();
            } else {
              Swal.fire({
                title: 'Hecho',
                text: 'El software se registró con exito',
                icon: 'success',
                confirmButtonColor: '#00aa99'
              }).then((result) => {
                if (result.value) {
                  this.router.navigate(['/software']);
                }
              });
            }
          },
          err => console.error(err)
        );
    }
  }

}
