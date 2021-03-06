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
    /*
    let params = JSON.stringify(request);
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('x-access-token', token);
    // .set('Access-Control-Allow-Headers', token);
    //.set('Authorization', token);
    console.log(request);
    return this._http.post(this.url + 'solicitud', request, {
      headers: headers,
    });*/
    console.log(token);
    var myHeaders = new Headers();
    //  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append('x-access-token', token);
    //myHeaders.append('Authorization', token);
    // myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:8081');
    var urlencoded = new FormData();
    urlencoded.append('adjunto', request.adjunto[0], 'MI TEXT');
    urlencoded.append('tipoSolicitud', request.tipoSolicitud);
    urlencoded.append('asunto', request.asunto);
    urlencoded.append('detalle', request.detalle);
    urlencoded.append('info', request.info);
    urlencoded.append('ubicacion', request.ubicacion);
    urlencoded.append('prioridad', request.prioridad);

    var requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };
    const data$ = Observable.create((observer) => {
      fetch(this.url + 'solicitud', requestOptions)
        .then((response) => response.json()) // or text() or blob() etc.
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });
    return data$;
  }
}
