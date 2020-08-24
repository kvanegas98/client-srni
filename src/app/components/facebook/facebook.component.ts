import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SocialUser } from 'angularx-social-login';
import { SocialAuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css'],
})
export class FacebookComponent implements OnInit {
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
    this.title = 'Identificate con facebook';
    this.user = new User('', '', '', '', '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    console.log('Componente de Facebook cargado...');

    this.authService.authState.subscribe((us) => {
      this.us = us;
      console.log(this.us);
      this.idtoken = this.us.authToken;
      console.log('Hola mundo' + this.idtoken);

      //Servicio con Facebook
      this._userService.signupFB(this.idtoken, this.us).subscribe(
        (response) => {
          console.log(response);

          this.identity = response.usuario;

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
            localStorage.setItem('token', response.token);
            //localStorage.setItem('token', this.idtoken);
            //this.getToken();
            this.status = 'success';
            this._router.navigate(['/request']);
            console.log(this.status);

            // Conseguir el token
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
  ngDocheck() {
    this.authService.authState.subscribe((us) => {
      this.us = us;
      console.log(this.us);
      this.idtoken = this.us.authToken;
      console.log('Hola mundo' + this.idtoken);

      //Servicio con Facebook
      this._userService.signupFB(this.idtoken, this.user).subscribe(
        (response) => {
          console.log(response);

          this.identity = response.usuario;

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
            localStorage.setItem('token', response.token);
            //localStorage.setItem('token', this.idtoken);
            //this.getToken();
            this.status = 'success';
            this._router.navigate(['/request']);
            console.log(this.status);

            // Conseguir el token
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
          console.log(localStorage.getItem('token'));
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

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
