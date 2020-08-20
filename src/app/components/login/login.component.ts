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
      this.loggedIn = us != null;
      console.log(this.us);
    });
  }

  onSubmit() {
    console.log(this.user);
    this._userService.signup(this.user).subscribe(
      (response) => {
        this.identity = response.usuario;
        console.log(response);
        this._router.navigate(['/request']);

        console.log(this.identity);

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
        this.token = response.token;

        // console.log(this.token);

        if (this.token == null) {
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

  onSubmit() {
    console.log(this.user);
    this._userService.signup(this.user).subscribe(
      (response) => {
       console.log()
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
}
