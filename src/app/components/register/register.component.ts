import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public title: string;
  public user: User;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.title = 'Registrate';
    this.user = new User(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'EXTERN_ROLE'
    );
  }

  ngOnInit() {
    console.log('Componente de login cargado...');
  }

  onSubmit(form) {
    console.log(this.user);
  }
}
