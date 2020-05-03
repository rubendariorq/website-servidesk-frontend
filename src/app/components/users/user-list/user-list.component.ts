import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";

//Services
import { UserService } from "../../../services/user/user.service";

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
  users: any = [];

  constructor(private userService: UserService) { }

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
    this.userService.getUsers()
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