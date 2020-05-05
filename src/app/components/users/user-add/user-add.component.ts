import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
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
  dependencies: any = [];
  user: User = {
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_changed_date: "",
    type_user: "",
    status: "",
    failde_attempts: 0,
    dependencies_id: 0,
    type_employee_ti: "",
    users_email: "",
    id: 0,
    name_dependencie: ""
  }

  constructor(private dependenciesService: DependenciesService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getDependencies();
  }

  addUser() {
    if (this.user.email == "" || this.user.first_name == "" || this.user.last_name == "" || this.user.password == "" || this.user.type_employee_ti == "" || this.user.dependencies_id == 0) {
      Swal.fire({
        icon: 'warning',
        text: 'Debe llenar todos los campos',
        confirmButtonColor: '#00aa99'
      });
      console.log(this.user);
    } else {
      const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (emailRegex.test(this.user.email)) {
        if (this.user.type_employee_ti == "Tecnico") {
          this.user.type_user = "FuncionarioTI";
        } else {
          this.user.type_user = this.user.type_employee_ti;
        }

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
        this.userService.addUser(this.user)
          .subscribe(
            res => {
              console.log(res);
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

}
