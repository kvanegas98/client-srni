import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { RequestService } from '../../services/request.service';
import { Request } from 'src/app/models/request';

//alertas
import swal from 'sweetalert';

@Component({
  selector: 'request',
  templateUrl: './request.component.html',
  providers: [UserService, RequestService],
})
export class RequestComponent implements OnInit {
  public title: string;
  public status: string;
  public request: Request;
  public identity;
  public token;
  public url: string;
  public upload: Array<File>;
  public imagen: string;
  public bytes = []; // get from server

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _requestService: RequestService
  ) {
    this.title = 'Solicitudes';
    this.request = new Request('', '', '', '', '', '', []);
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    console.log('Componente de Solicitud cargado...');
  }
  onFileChanged(e) {
    console.log('File Changed ' + e);
    this.upload = e.target.files;

    if (e.target.files && e.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]); // read file as data url

      reader.onload = (e) => {
        // called once readAsDataURL is completed
        //this.image = event.target.result;
      };
    }
    console.log(this.upload);
  }

  onSubmit(form) {
    // let formData = new FormData();

    /*for (let i = 0; i < this.upload.length; i++) {
      formData.append('uploads[]', this.upload[i], this.upload[i].name);
      this.request.adjunto.append('uploads[]', this.upload[i], this.upload[i].name);
  
    }*/
    this.request.adjunto = this.upload;

    var reader = new FileReader();
    // reader.readAsDataURL(this.upload);

    console.log('Probando Archivo' + this.request.adjunto);

    this._requestService.addRequest(this.token, this.request).subscribe(
      (response) => {
        //Obteniendo el bytes del adjunto de la imagen
        this.bytes = response.solicitudDB.adjunto;
        //Url dee arcchivo
        this.imagen = 'data:image/JPEG;base64,' + this.bytes;
        //if (response.user && response.user._id) {
        console.log(response);
        //console.log('Imagen []' + this.imagen);

        console.log('El asunto' + this.request.adjunto);
        this.status = 'success';
        //Alerta
        swal(
          'Solicitud enviada ',
          'La solicitud se ha enviado correctamente !!!',
          'success'
        );
        form.reset();
        /* } else {
          this.status = 'error';
        }*/
      },
      (error) => {
        swal(
          'Solicitud no enviada',
          'La solicitud no ha sido enviada!!!',
          'error'
        );
        console.log(<any>error);
      }
    );
  }

  /*onCancel(form) {
    form.reset();
  }*/
}
