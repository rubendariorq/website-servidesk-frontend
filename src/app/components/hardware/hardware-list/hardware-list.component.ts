import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import Swal from "sweetalert2";

//Interfaces
import { ConnectionLost } from 'src/app/interfaces/ConnectionLost';

//Services
import { HardwareService } from "../../../services/hardware/hardware.service";
import { DependenciesService } from "../../../services/dependencies.service";

@Component({
  selector: 'app-hardware-list',
  templateUrl: './hardware-list.component.html',
  styleUrls: ['./hardware-list.component.css']
})
export class HardwareListComponent implements OnInit {

  title = 'Hardware';
  connectionLost: ConnectionLost;
  hardware: any = [];
  dependencies: any = [];
  selectDependencie = "";

  constructor(private hardwareService: HardwareService, private router:Router, private dependenciesService: DependenciesService) { }

  ngOnInit() {
    this.getAllHardware();
  }

  getAllHardware(): void {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos realizando la consulta',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
    this.dependenciesService.getDependencies()
      .subscribe(
        res => {
          console.log(res);
          document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

          this.connectionLost = res;
          if (this.connectionLost.code == 'ETIMEDOUT') {
            console.log('Conexión perdida. Reconectando...');
            this.getAllHardware();
          } else {
            if (res[0] == undefined) {
              this.router.navigate(["/dependencies/add"]);
              Swal.fire({
                icon: 'warning',
                title: 'Aviso',
                text: 'Debe registrar las dependencias antes de continuar',
                confirmButtonColor: '00aa99'
              })
            } else {
              this.dependencies = res;

              this.hardwareService.getAllHardware()
                .subscribe(
                  res => {
                    console.log(res);

                    this.connectionLost = res;
                    if (this.connectionLost.code == 'ETIMEDOUT') {
                      console.log('Conexión perdida. Reconectando...');
                      this.getAllHardware();
                    } else {
                      if (res[0] == undefined) {
                        Swal.fire({
                          icon: 'warning',
                          title: 'Aviso',
                          text: 'No hay hardware registrado',
                          confirmButtonColor: '00aa99'
                        })
                      } else {
                        this.hardware = res;
                      }
                    }
                  },
                  err => console.error(err)
                );
            }
          }
        },
        err => console.error(err)
      );
  }

}
