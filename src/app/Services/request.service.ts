import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Request } from '../models/request';

@Injectable()
export class RequestService {
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  addRequest(token, request): Observable<any> {
    let params = JSON.stringify(request);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-access-token', token);
    //.set('Authorization', token);

    return this._http.post(this.url + 'solicitud', params, {
      headers: headers,
    });
  }
}
