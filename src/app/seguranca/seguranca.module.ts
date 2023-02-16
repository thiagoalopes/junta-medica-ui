import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './auth.guard';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { ProvimentoHttpInterceptor} from './provimento.http-interceptor';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {LoginComponent} from './login/login.component';
@NgModule({
  declarations: [LoginComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('token');
            },
            // rotas permitidas
            //allowedDomains:  environment.tokenWhitelistedDomains,
            // rotas não permitidas
            //disallowedRoutes: environment.tokenBlacklistedRoutes,
          }
        }),
    ],
  providers: [
    AuthGuard,
    JwtHelperService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ProvimentoHttpInterceptor,
        multi: true
    },

  ]
})
export class SegurancaModule { }
