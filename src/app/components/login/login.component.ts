import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

import { SocialUser } from 'angularx-social-login';
import { SocialAuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  public title: string;
  public user: User;
  public status: string;
  public identity;
  public token;
  public cerrar;
  public idtoken;
  us: SocialUser;
  loggedIn: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private authService: SocialAuthService
  ) {
    this.title = 'Identificate';
    this.user = new User('', '', '', '', '', '', '', '', '', '', '');
  }

  ngOnInit() {
    console.log('Componente de login cargado...');
    this.authService.authState.subscribe((us) => {
      this.us = us;
      this.idtoken = this.us.idToken;
      console.log('Hola mundo' + this.idtoken);

      this._userService.signupGoogle(this.idtoken).subscribe(
        (response) => {
          this.identity = response.usuario;
          //console.log('Ojo' + response);

          // console.log('Mi pana' + this.idtoken);

          console.log(response);
          // this._router.navigate(['/request']);

          // this.cerrar = response.usuario.google;
          //console.log('CERRANDO ' + this.cerrar);
          if (!this.identity || !this.identity._id) {
            this.status = 'error';
            console.log(this.status);
          } else {
            // PERSISTIR DATOS DEL USUARIO
            localStorage.setItem('identity', JSON.stringify(this.identity));
            this.status = 'success';
            this._router.navigate(['/request']);
            console.log(this.status);

            // Conseguir el token
            this.getToken();
          }
        },
        (error) => {
          var errorMessage = <any>error;
          console.log(errorMessage);

          if (errorMessage != null) {
            this.status = 'error';
          }
        }
      );

      this.loggedIn = us != null;
      // console.log(this.us);
    });
  }

  onSubmit() {
    this._userService.signup(this.user).subscribe(
      (response) => {
        this.identity = response.usuario;
        console.log(response);
        this._router.navigate(['/request']);

        // console.log('OKKKKKKKKKK' + this.identity);

        if (!this.identity || !this.identity._id) {
          this.status = 'error';
        } else {
          // PERSISTIR DATOS DEL USUARIO
          localStorage.setItem('identity', JSON.stringify(this.identity));
          this.status = 'success';
          this._router.navigate(['/request']);

          // Conseguir el token
          this.getToken();
        }
      },
      (error) => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }
  getToken() {
    this._userService.signup(this.user, 'true').subscribe(
      (response) => {
        console.log(response);
        this.token = response.token;

        // console.log(this.token);

        if (this.token.lenght <= 0) {
          this.status = 'error';
          console.log('Hola mundo');
        } else {
          // PERSISTIR TOKEN DEL USUARIO
          localStorage.setItem('token', this.token);

          // Conseguir los contadores o estadisticas del usuario
          // this.getCounters();
        }
      },
      (error) => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  //Metodos redes sociales
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
