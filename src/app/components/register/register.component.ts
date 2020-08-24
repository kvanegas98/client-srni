import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

//alertas
import swal from 'sweetalert';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  public title: string;
  public user: User;
  public status: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService
  ) {
    this.title = 'Registrate';
    // this.status = 'error';
    this.user = new User('', '', '', '', '', '', '', '', '', '', '');
  }

  ngOnInit() {
    console.log('Componente de login cargado...');
  }

  onSubmit(form) {
    // console.log(this.user);
    this._userService.register(this.user).subscribe(
      (response) => {
        console.log(response);

        if (response.usuario._id && response.usuario) {
          console.log(response);
          this.status = 'success';
          //Alerta
          swal(
            'Usuario creado ',
            'El usuario ' +
              response.usuario.nombre +
              ' se ha creado correctamente !!!',
            'success'
          );
          form.reset();
        }
      },
      (error) => {
        console.log(<any>error);
        this.status = 'error';
        swal(
          'Usuario no creado ',
          'El registro no ha podido completarse, quizas tu email ya esté en uso, intentalo de nuevo con otros datos',
          'error'
        );
        this.status = 'error';
      }
    );
  }
}
