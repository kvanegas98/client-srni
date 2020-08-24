import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { User } from '../models/user';
import { SocialUser } from 'angularx-social-login';

@Injectable()
export class UserService {
  public url: string;
  public identity;
  public token;
  public stats;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  register(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    //  return this._http.post(this.url + 'usuario', params, { headers: headers });
    return this._http.post(this.url + 'usuario', user);
  }

  signup(user, gettoken = null): Observable<any> {
    if (gettoken != null) {
      user.gettoken = gettoken;
    }
    console.log(user);
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    // return this._http.post(this.url + 'login', params, { headers: headers });
    return this._http.post(this.url + 'login', user, { headers: headers });
  }

  signupGoogle(idtoken): Observable<any> {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    // myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:8081');
    var urlencoded = new URLSearchParams();
    urlencoded.append('idtoken', idtoken);

    var requestOptions: any = {
      method: 'POST',

      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };
    const data$ = Observable.create((observer) => {
      fetch(this.url + 'google', requestOptions)
        .then((response) => response.json()) // or text() or blob() etc.
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });
    return data$;
  }

  signupFB(idtoken, user: SocialUser): Observable<any> {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    var urlencoded = new URLSearchParams();
    //ENviando token
    urlencoded.append('idtoken', idtoken);
    //Enviando objeto Usuario
    urlencoded.append('nombre', user.firstName);
    urlencoded.append('email', user.email);
    urlencoded.append('img', user.photoUrl);
    urlencoded.append('Papellido', user.lastName);

    var requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };
    const data$ = Observable.create((observer) => {
      fetch(this.url + 'facebook', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });
    return data$;
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));

    if (identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));
    console.log(token);

    if (token != 'undefined') {
      token = token;
    } else {
      token = null;
    }

    return token;
  }
}
