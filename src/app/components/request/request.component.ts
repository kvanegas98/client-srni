import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'request',
  templateUrl: './request.component.html',
  providers: [UserService],
})
export class RequestComponent implements OnInit {
  ngOnInit() {
    console.log('Componente de login cargado...');
  }
}
