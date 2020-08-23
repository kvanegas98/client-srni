import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { RequestService } from '../../services/request.service';
import { Request } from 'src/app/models/request';

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

  //@Input() user: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _requestService: RequestService
  ) {
    this.title = 'Solicitudes';
    this.request = new Request('', '', '', '', '', '', '');
    this.identity = this._userService.getIdentity();

    this.token = this._userService.getToken();
  }

  ngOnInit() {
    console.log('Componente de Solicitud cargado...');
  }

  onSubmit(form) {
    this._requestService.addRequest(this.token, this.request).subscribe(
      (response) => {
        //if (response.user && response.user._id) {
        console.log(response);
        this.status = 'success';
        form.reset();
        /* } else {
          this.status = 'error';
        }*/
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  /*onCancel(form) {
    form.reset();
  }*/
}
