import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import Swal from 'sweetalert2';

//Interfaces
import { ConnectionLost } from "../../../interfaces/ConnectionLost";
import { User } from "../../../interfaces/User";

//Services
import { DependenciesService } from "../../../services/dependencies.service";
import { UserService } from "../../../services/user/user.service";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  title: string = 'Usuarios';
  connectionLost: ConnectionLost;
  edit: boolean = false;
  dependencies: any = [];
  user: User = {
    id_user: 0,
    email: "",
    name: "",
    password: "",
    password_changed_date: "",
    type_user: "",
    status: "",
    failde_attempts: 0,
    dependencies_id_dependencie: 0,
    id_dependencie: 0,
    name_dependencie: ""
  }

  constructor(private dependenciesService: DependenciesService, private router: Router, private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getDependencies();

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
      this.userService.getUserForId(parseInt(params.id))
        .subscribe(
          res => {
            console.log(res);

            this.connectionLost = res;
            if (this.connectionLost.code == 'ETIMEDOUT') {
              console.log('Conexión perdida. Reconectando...');
              this.ngOnInit();
            } else {
              if (res[0] == undefined) {
                this.router.navigate(["/dependencies/add"]);
                Swal.fire({
                  icon: 'warning',
                  title: 'Aviso',
                  text: 'El usuario no existe',
                  confirmButtonColor: '00aa99'
                });
              } else {
                this.user = res[0];
              }
            }
          },
          err => console.error(err)
        );
    } else {
    }
  }

  addUser() {
    if (this.user.email == "" || this.user.name == "" || this.user.password == "" || this.user.type_user == "" || this.user.dependencies_id_dependencie == 0) {
      Swal.fire({
        icon: 'warning',
        text: 'Debe llenar todos los campos',
        confirmButtonColor: '#00aa99'
      });
      console.log(this.user);
    } else {
      const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (emailRegex.test(this.user.email)) {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.user.password_changed_date = date;
        this.user.status = "Activo";

        Swal.fire({
          title: 'Espere un momento',
          text: 'Estamos realizando la consulta',
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading()
          }
        });
        this.userService.getUserForEmail(this.user.email)
          .subscribe(
            res => {
              this.connectionLost = res;
              if (this.connectionLost.code == 'ETIMEDOUT') {
                console.log('Conexión perdida. Reconectando...');
                this.addUser();
              } else {
                console.log(res);
                document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

                if (res.length > 0) {
                  Swal.fire({
                    icon: 'warning',
                    title: 'Aviso',
                    text: 'El correo ingresado ya existe',
                    confirmButtonColor: '00aa99'
                  })
                } else {
                  this.userService.addUser(this.user)
                    .subscribe(
                      res => {
                        console.log(res);

                        this.connectionLost = res;
                        if (this.connectionLost.code == 'ETIMEDOUT') {
                          console.log('Conexión perdida. Reconectando...');
                          this.addUser();
                        } else {
                          Swal.fire({
                            title: 'Hecho',
                            text: 'El usuario se creó con exito',
                            icon: 'success',
                            confirmButtonColor: '#00aa99'
                          }).then((result) => {
                            if (result.value) {
                              this.router.navigate(['/users']);
                            }
                          });
                        }
                      },
                      err => console.error(err)
                    );
                }
              }
            },
            err => console.error(err)
          );

      } else {
        Swal.fire({
          icon: 'error',
          text: 'El correo ingresado no cumple con el formato adecuado',
          confirmButtonColor: '#00aa99'
        });
      }
    }
  }

  getDependencies() {
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
            this.getDependencies();
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
            }
          }
        },
        err => console.error(err)
      );
  }

  generatePassword(): void {
    let passwordGenerated: string = "";
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let i = 0;
    while (i < 8) {
      passwordGenerated += characters.charAt(Math.floor(Math.random() * characters.length));
      i++;
    }
    console.log(passwordGenerated);
    this.user.password = passwordGenerated;
  }

  updateUser(): void {
    const id = this.activatedRoute.snapshot.params.id;

    if (this.user.email == "" || this.user.name == "" || this.user.type_user == "" || this.user.dependencies_id_dependencie == 0) {
      Swal.fire({
        icon: 'warning',
        text: 'Debe llenar todos los campos',
        confirmButtonColor: '#00aa99'
      });
      console.log(this.user);
    } else {
      const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (emailRegex.test(this.user.email)) {
        Swal.fire({
          title: 'Espere un momento',
          text: 'Estamos realizando la consulta',
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading()
          }
        });
        this.userService.getUserForEmail(this.user.email)
          .subscribe(
            res => {
              console.log(res);
              document.querySelector('div[class="swal2-container swal2-center swal2-backdrop-show"]').remove();

              if (res.length > 0) {
                const userAux: User = res[0];
                if (userAux.id_user == this.user.id_user) {
                  this.userService.updateUser(id, this.user)
                    .subscribe(
                      res => {
                        console.log(res);

                        if (this.connectionLost.code == 'ETIMEDOUT') {
                          console.log('Conexión perdida. Reconectando...');
                          this.updateUser();
                        } else {
                          Swal.fire({
                            title: 'Hecho',
                            text: 'El usuario se creó con exito',
                            icon: 'success',
                            confirmButtonColor: '#00aa99'
                          }).then((result) => {
                            if (result.value) {
                              this.router.navigate(['/users']);
                            }
                          });
                        }
                      },
                      err => console.error(err)
                    );
                } else {
                  Swal.fire({
                    icon: 'warning',
                    title: 'Aviso',
                    text: 'El correo ingresado ya existe',
                    confirmButtonColor: '00aa99'
                  })
                }
              } else {
                this.userService.updateUser(id, this.user)
                  .subscribe(
                    res => {
                      console.log(res);

                      if (this.connectionLost.code == 'ETIMEDOUT') {
                        console.log('Conexión perdida. Reconectando...');
                        this.updateUser();
                      } else {
                        Swal.fire({
                          title: 'Hecho',
                          text: 'El usuario se creó con exito',
                          icon: 'success',
                          confirmButtonColor: '#00aa99'
                        }).then((result) => {
                          if (result.value) {
                            this.router.navigate(['/users']);
                          }
                        });
                      }
                    },
                    err => console.error(err)
                  );
              }
            },
            err => console.error(err)
          );
      } else {
        Swal.fire({
          icon: 'error',
          text: 'El correo ingresado no cumple con el formato adecuado',
          confirmButtonColor: '#00aa99'
        });
      }
    }
  }
}
