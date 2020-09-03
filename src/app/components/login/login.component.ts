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
  /*
  ngDoCheck() {
    this.authService.authState.subscribe((us) => {
      this.us = us;
      console.log(this.us);
      this.idtoken = this.us.idToken;
      console.log('Hola mundo' + this.idtoken);

      this._userService.signupGoogle(this.idtoken).subscribe(
        (response) => {
          console.log(response);

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
*/
  ngOnInit() {
    console.log('Componente de login cargado...');

    this.authService.authState.subscribe((us) => {
      this.us = us;

      this.loggedIn = us != null;

      if (!this.loggedIn) {
        return;
      }

      this.idtoken = this.us.idToken;
      console.log('Hola mundo' + this.idtoken);

      //Vertificando el idtoken generado por google
      if (this.idtoken) {
        console.log('Autentificación por google');
        this._userService.signupGoogle(this.idtoken).subscribe(
          (response) => {
            console.log(response);

            this.identity = response.usuario;

            console.log(response);

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
        //Vertificando el authTOjen generado por Facebook
      } else if (this.us.authToken) {
        console.log('Autentificacion por facebook');
        this.authService.authState.subscribe((us) => {
          /*this.us = us;
          console.log(this.us);
          this.loggedIn = us != null;*/
          if (!this.loggedIn) return;

          this.idtoken = this.us.authToken;
          // console.log('Hola mundo' + this.idtoken);

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

      //Servicio con google
      /*  this._userService.signupGoogle(this.idtoken).subscribe(
        (response) => {
          console.log(response);

          this.identity = response.usuario;

          console.log(response);

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
      );*/

      // console.log(this.us);
    });
  }

  onSubmit() {
    this._userService.signup(this.user).subscribe(
      (response) => {
        this.identity = response.usuario;
        //   console.log(response);
        // this._router.navigate(['/request']);

        // console.log('OKKKKKKKKKK' + this.identity);

        if (!this.identity || !this.identity._id) {
          this.status = 'error';
        } else {
          // PERSISTIR DATOS DEL USUARIO
          localStorage.setItem('identity', JSON.stringify(this.identity));
          localStorage.setItem('token', response.token);
          // Conseguir el token

          //  this.getToken();
          this.status = 'success';
          this._router.navigate(['/request']);
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

  //Metodos redes sociales
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  /*signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }*/

  newAccount() {
    this._router.navigate(['/registro']);
  }

  signOut(): void {
    this.authService.signOut();
  }
  /*
  onSubmit() {
    console.log(this.user);
    this._userService.signup(this.user).subscribe(
      (response) => {
        console.log();
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
        this.token = response.token;

        console.log(this.token);

        if (this.token.length <= 0) {
          this.status = 'error';
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

  /*getCounters() {
    this._userService.getCounters().subscribe(
      (response) => {
        localStorage.setItem('stats', JSON.stringify(response));
        this.status = 'success';
        this._router.navigate(['/']);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  } */
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
