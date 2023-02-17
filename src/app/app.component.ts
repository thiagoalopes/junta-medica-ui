import { AuthService } from './seguranca/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'junta-medica-ui';

  constructor(private authService: AuthService, public router: Router){}

  logout(){
    this.authService.logout();
    this.router.navigate(['']);
  }
}
