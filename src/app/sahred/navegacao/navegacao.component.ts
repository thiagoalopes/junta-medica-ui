import { Router } from '@angular/router';
import { Payload } from './../../seguranca/payload.model';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.css']
})
export class NavegacaoComponent implements OnInit {

  constructor(private authService: AuthService, public router: Router) { }

  payload: Payload;
  isLogged: boolean;

  ngOnInit(): void {
    if(!this.authService.isAccessTokenInvalido()){
      this.payload = JSON.parse(this.authService.getCookie('payload'));
      this.isLogged = true;

    }
  }
}
