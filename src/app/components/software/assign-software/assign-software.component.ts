import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { ActivatedRoute } from "@angular/router";

//Interfaces
import { ConnectionLost } from 'src/app/interfaces/ConnectionLost';
import { Software } from 'src/app/interfaces/Software';
import { Licenses } from 'src/app/interfaces/Licenses';
import { SoftwareForComputer } from 'src/app/interfaces/SoftwareForComputer';

//Services
import { SoftwareService } from "../../../services/software/software.service";
import { LicenseService } from "../../../services/license/license.service";

@Component({
  selector: 'app-assign-software',
  templateUrl: './assign-software.component.html',
  styleUrls: ['./assign-software.component.css']
})
export class AssignSoftwareComponent implements OnInit {

  software: any = [];
  licenses: any = [];
  selectSoftware: string = "";
  selectLicense: string = "";
  instalation_date: string = "";
  connectionLost: ConnectionLost;
  softwareForComputer: SoftwareForComputer = {
    id_license: 0,
    id_software: 0,
    instalation_date: "",
    inventory_plate: ""
  };
  softwareAux: Software = {
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
    contractual_use_restriction: "",
    access_type: "",
    software_type: ""
  }
  licenseAux: Licenses = {
    id_license: 0,
    serial_code: "",
    months_validity: 0,
    cost: 0,
    free_commercial: "",
    client_server: "",
    software: ""
  }

  constructor(private softwareService: SoftwareService, private licenseService: LicenseService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getAllSoftwareAndAllLicenses();
  }

  getAllSoftwareAndAllLicenses(): void {
    this.softwareService.getAllSoftware()
      .subscribe(
        res => {
          console.log(res);

          this.connectionLost = res;
          if (this.connectionLost.code == 'ETIMEDOUT') {
            console.log('Conexión perdida. Reconectando...');
            this.getAllSoftwareAndAllLicenses();
          } else {
            this.software = res;

            this.licenseService.getLicenses()
              .subscribe(
                res => {
                  console.log(res);

                  this.connectionLost = res;
                  if (this.connectionLost.code == 'ETIMEDOUT') {
                    console.log('Conexión perdida. Reconectando...');
                    this.getAllSoftwareAndAllLicenses();
                  } else {
                    this.licenses = res;
                  }
                },
                err => console.error(err)
              );
          }
        },
        err => console.error(err)
      );
  }

  showInfoSoftware(): void {
    if (this.selectSoftware != "") {
      let i = 0;
      while (i < this.software.length) {
        if (this.software[i].name_software == this.selectSoftware) {
          this.softwareAux = this.software[i];
        }
        i++;
      }
    } else {
      this.softwareAux = {
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
        contractual_use_restriction: "",
        access_type: "",
        software_type: ""
      }
    }
    this.softwareForComputer.id_software = this.softwareAux.id_software;
  }

  showInfoLicense(): void {
    if (this.selectLicense != "") {
      let i = 0;
      while (i < this.licenses.length) {
        if (this.licenses[i].software == this.selectLicense) {
          this.licenseAux = this.licenses[i];
        }
        i++;
      }
    } else {
      this.licenseAux = {
        id_license: 0,
        serial_code: "",
        months_validity: 0,
        cost: 0,
        free_commercial: "",
        client_server: "",
        software: ""
      }
    }
    this.softwareForComputer.id_license = this.licenseAux.id_license;
  }

  installSoftware(): void {
    let inventory_plate = this.activatedRoute.snapshot.params.id;

    this.softwareForComputer.inventory_plate = inventory_plate;
    this.softwareForComputer.instalation_date = this.instalation_date;

    if (this.softwareForComputer.id_license == 0 || this.softwareForComputer.id_software == 0 || this.softwareForComputer.instalation_date == "") {
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
      this.softwareService.installSoftware(this.softwareForComputer)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.installSoftware();
            } else {
              if (this.connectionLost.message.indexOf("Duplicate") >= 0 || this.connectionLost.message.indexOf("duplicate") >= 0) {
                Swal.fire({
                  icon: 'warning',
                  text: 'El sotware ya se encuentra instalado en este euipo',
                  confirmButtonColor: '#00aa99'
                });
              } else {
                Swal.fire({
                  title: 'Hecho',
                  text: 'El software se instaló con exito',
                  icon: 'success',
                  confirmButtonColor: '#00aa99'
                }).then((result) => {
                  this.reset_values();
                  console.log('actualizar la tabla de software instalado');
                });
              }
            }
          },
          err => console.error(err)
        );
    }
  }

  reset_values(): void {
    this.softwareAux = {
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
      contractual_use_restriction: "",
      access_type: "",
      software_type: ""
    };
    this.licenseAux = {
      id_license: 0,
      serial_code: "",
      months_validity: 0,
      cost: 0,
      free_commercial: "",
      client_server: "",
      software: ""
    };
    this.selectSoftware = "";
    this.selectLicense = "";
    this.instalation_date = "";

  }

}
