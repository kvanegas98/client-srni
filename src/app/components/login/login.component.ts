import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public title: string;
  // public user: User;
  public status: string;
  public identity;
  public token;

  constructor() {
    this.title = 'Identificate';
  }

  ngOnInit() {
    console.log('Componente de login cargado...');
  }
}
