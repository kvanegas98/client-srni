/*import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public title: string;
  public identity;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'SRNI';
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
  }
}*/

import { Component, OnInit, DoCheck, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from './services/user.service';
import { GLOBAL } from './services/global';

import { SocialUser } from 'angularx-social-login';
import { SocialAuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService],
})
export class AppComponent implements OnInit, DoCheck {
  public title: string;
  public identity;
  public url: string;
  us: SocialUser;
  loggedIn: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private authService: SocialAuthService
  ) {
    this.title = 'SRNI';
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.authService.authState.subscribe((us) => {
      this.us = us;
      this.loggedIn = us != null;
      /*if (this.us) {
        this._router.navigate(['/request']);
        console.log('Fresco el pana');
      }*/
      console.log(this.us);
    });
    //console.log(this.us);
    console.log('Mi pana', this.identity);
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.authService.authState.subscribe((us) => {
      this.us = us;
      this.loggedIn = us != null;

      // console.log(this.us);
    });
  }

  logout() {
    localStorage.clear();
    this.identity = null;

    this._router.navigate(['/']);
  }

  /* login() {
    //localStorage.clear();
    //this.identity = null;
    this._router.navigate(['/request']);
  }*/

  signOut(): void {
    this.authService.signOut();
    localStorage.clear();
  }
}
