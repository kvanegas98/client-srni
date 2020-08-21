import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { User } from '../models/user';

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
    return this._http.post(this.url + 'login', user);
  }

  signupGoogle(idtoken): Observable<any> {
    /* if (tokenId != null) {
      user.gettoken = tokenId;
    }*/

    //
    //let params = JSON.stringify(user);
    //let headers = new HttpHeaders().set('Content-Type', 'application/json');
    /*let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', idtoken);*/

    //return this._http.post(this.url + 'google', { headers: headers });
    //  return this._http.post(this.url + 'google', idtoken);
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
      fetch('http://localhost:3000/google', requestOptions)
        .then((response) => response.json()) // or text() or blob() etc.
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });
    return data$;
    //return this._http.post(this.url + 'google', '', requestOptions);
    //return fetch('http://localhost:3000/google', requestOptions);
    //>>>>>>> 4fb100a52859e90a896992f0846c267596b1b8f8
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

  /* getStats() {
       let stats = JSON.parse(localStorage.getItem('stats'));
   
       if (stats != 'undefined') {
         this.stats = stats;
       } else {
         this.stats = null;
       }
   
       return this.stats;
     }*/

  /* getCounters(userId = null): Observable<any> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());

    if (userId != null) {
      return this._http.get(this.url + 'counters/' + userId, {
        headers: headers,
      });
    } else {
      return this._http.get(this.url + 'counters', { headers: headers });
    }
  }*/

  /*updateUser(user: User): Observable<any> {
       let params = JSON.stringify(user);
       let headers = new HttpHeaders()
         .set('Content-Type', 'application/json')
         .set('Authorization', this.getToken());
   
       return this._http.put(this.url + 'update-user/' + user._id, params, {
         headers: headers,
       });
     }
   
     getUsers(page = null): Observable<any> {
       let headers = new HttpHeaders()
         .set('Content-Type', 'application/json')
         .set('Authorization', this.getToken());
   
       return this._http.get(this.url + 'users/' + page, { headers: headers });
     }
   
     getUser(id): Observable<any> {
       let headers = new HttpHeaders()
         .set('Content-Type', 'application/json')
         .set('Authorization', this.getToken());
   
       return this._http.get(this.url + 'user/' + id, { headers: headers });
     }
   }*/
}
