import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  goHome() {
    this._router.navigate(['/']);
  }
}
