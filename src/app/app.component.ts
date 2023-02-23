import { AuthService } from './seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payload } from './seguranca/payload.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'junta-medica-ui';

  constructor(private authService: AuthService, public router: Router){}

  ngOnInit() {}

  logout(){
    this.authService.logout();
    this.router.navigate(['']);
  }

}
