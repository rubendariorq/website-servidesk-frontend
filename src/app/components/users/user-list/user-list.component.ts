import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import Swal from "sweetalert2";

//Services
import { UserService } from "../../../services/user/user.service";
import { DependenciesService } from "../../../services/dependencies.service";

//Interfaces
import { User } from 'src/app/interfaces/User';
import { ConnectionLost } from "../../../interfaces/ConnectionLost";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  connectionLost: ConnectionLost;
  title: string = 'Usuarios';
  dependencies: any = []
  users: any = [];
  selectStatus = "";
  selectTypeUser = "";
  selectDependencie = "";

  constructor(private userService: UserService, private dependenciesService: DependenciesService, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
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
            this.getUsers();
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

              this.userService.getUsers()
                .subscribe(
                  res => {
                    console.log(res);

                    this.connectionLost = res;
                    if (this.connectionLost.code == 'ETIMEDOUT') {
                      console.log('Conexión perdida. Reconectando...');
                      this.getUsers();
                    } else {
                      if (res[0] == undefined) {
                        Swal.fire({
                          icon: 'warning',
                          title: 'Aviso',
                          text: 'No hay usuarios registrados',
                          confirmButtonColor: '00aa99'
                        })
                      } else {
                        this.users = res;
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

  getUsersForDependencie(dependencie: string) {
    this.selectStatus = "";
    this.selectTypeUser = "";

    if (dependencie != "") {
      Swal.fire({
        title: 'Espere un momento',
        text: 'Estamos realizando la consulta',
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      });
      this.userService.getUsersForDependencie(dependencie)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.getUsersForDependencie(dependencie);
            } else {
              if (res[0] == undefined) {
                Swal.fire({
                  icon: 'warning',
                  title: 'Aviso',
                  text: 'No hay usuarios registrados',
                  confirmButtonColor: '00aa99'
                })
                this.users = [];
              } else {
                this.users = [];
                this.users = res;
              }
            }
          },
          err => console.error(err)
        );
    } else {
      this.getUsers();
    }
  }

  getUsersForStatus(status: string) {
    this.selectDependencie = "";
    this.selectTypeUser = "";

    if (status != "") {
      Swal.fire({
        title: 'Espere un momento',
        text: 'Estamos realizando la consulta',
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      });
      this.userService.getUsersForStatus(status)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.getUsersForStatus(status);
            } else {
              if (res[0] == undefined) {
                Swal.fire({
                  icon: 'warning',
                  title: 'Aviso',
                  text: 'No hay usuarios registrados',
                  confirmButtonColor: '00aa99'
                })
                this.users = [];
              } else {
                this.users = [];
                this.users = res;
              }
            }
          },
          err => console.error(err)
        );
    } else {
      this.getUsers();
    }
  }

  getUsersForTypeUser(typeUser: string) {
    this.selectDependencie = "";
    this.selectStatus = "";

    if (typeUser != "") {
      Swal.fire({
        title: 'Espere un momento',
        text: 'Estamos realizando la consulta',
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      });
      this.userService.getUsersForTypeUser(typeUser)
        .subscribe(
          res => {
            console.log(res);
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.getUsersForTypeUser(typeUser);
            } else {
              if (res[0] == undefined) {
                Swal.fire({
                  icon: 'warning',
                  title: 'Aviso',
                  text: 'No hay usuarios registrados',
                  confirmButtonColor: '00aa99'
                })
                this.users = [];
              } else {
                this.users = [];
                this.users = res;
              }
            }
          },
          err => console.error(err)
        );
    } else {
      this.getUsers();
    }
  }

  deleteUser(id: number): void {
    Swal.fire({
      icon: 'warning',
      title: '¿Desea eliminar el usuario?',
      text: 'Si elimina el usuario no podra recuperarlo más adelante',
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
        this.userService.deleteUser(id).subscribe(
          res => {
            console.log(res);

            this.connectionLost = res;
            document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.deleteUser(id);
            } else {
              Swal.fire({
                icon: 'success',
                title: 'Hecho',
                text: 'El usuario se ha borrado con éxito',
                confirmButtonColor: '#00aa99'
              }).then(result => {
                if (result.value) {
                  this.getUsers();
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