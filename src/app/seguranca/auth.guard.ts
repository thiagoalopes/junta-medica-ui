import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authServive: AuthService,
    private router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.authServive.temQualquerPermissao(next.data['roles']).then(result=>{
        if(next.data['roles'] && !result){
          console.log(result);
          this.router.navigate(['/']);
          return false
        }
        return true;
      });

      // return new Promise((resolve, reject)=>{

      //   if (this.authServive.isAccessTokenInvalido()) {
      //     this.authServive.obterNovoAccessToken()
      //     .then(() => {
      //       if (this.authServive.isAccessTokenInvalido()) {
      //         this.router.navigate(['/login']);
      //         resolve(false);
      //       }
      //       resolve(true);
      //     });
      //   }
      //   else if (next.data['roles'] && !this.authServive.temQualquerPermissao(next.data['roles']).then(()=>{
      //     this.router.navigate(['/nao-autorizado']);
      //   })) {
      //     resolve(false);
      //   }
      //   resolve(true);
      // });
  }

}
