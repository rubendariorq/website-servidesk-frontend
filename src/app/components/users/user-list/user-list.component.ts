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
                        let i = 0;
                        let data = res;
                        let arrayAux = [];
                        while (i < data.length) {
                          let userAux: User = data[i];
                          if (userAux.type_user != "Profesional") {
                            arrayAux.push(userAux);
                          }
                          i++;
                        }
                        this.users = arrayAux;
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
    console.log(dependencie);
  }
}