import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  providers: [UserService],
})
export class RegisterComponent implements OnInit {
  public title: string;
  public user: User;
  public status: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService
  ) {
    this.title = 'Registrate';
    this.user = new User('', '', '', '', '', '', '', '', '', '', '');
  }

  ngOnInit() {
    console.log('Componente de login cargado...');
  }

  onSubmit(form) {
    console.log(this.user);
    this._userService.register(this.user).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }
}
