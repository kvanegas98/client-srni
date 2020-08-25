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

  /*afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png, .gif, .jpeg',
    maxSize: '100',
    uploadAPI: {
      // url: GLOBAL.url + 'solicitud',
    },
    theme: 'attachPin',
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu archivo para la solicitud...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
    },
  };*/

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _requestService: RequestService
  ) {
    this.title = 'Solicitudes';
    this.request = new Request('', '', '', '', '', '', []);
    this.identity = this._userService.getIdentity();

    this.token = this._userService.getToken();
  }

  ngOnInit() {
    console.log('Componente de Solicitud cargado...');
  }
  onFileChanged(e) {
    console.log('File Changed ' + e);
    this.upload = e.target.files;
  }

  onSubmit(form) {
    // let formData = new FormData();

    /*for (let i = 0; i < this.upload.length; i++) {
      formData.append('uploads[]', this.upload[i], this.upload[i].name);
      this.request.adjunto.append('uploads[]', this.upload[i], this.upload[i].name);
  
    }*/
    this.request.adjunto = this.upload;
    console.log('Probando Archivo' + this.request.adjunto);

    this._requestService.addRequest(this.token, this.request).subscribe(
      (response) => {
        //if (response.user && response.user._id) {
        console.log(response);
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
