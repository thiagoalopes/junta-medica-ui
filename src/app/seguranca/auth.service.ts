import { retry } from 'rxjs/operators';
import { Token } from './login/token.model';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from './../../environments/environment.prod';

import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string;
  tokensRevokeUrl: string;
  usuarioPayloadUrl: string;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) {
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
    this.usuarioPayloadUrl = `${environment.apiUrl}/api/auth/usuarios/payload`;

    this.carregarToken();
  }

  logout() {
    this.deleteCookie('refresh_token');
    this.deleteCookie('payload');
    localStorage.removeItem('token');
  }

  login(usuario: string, senha: string): Promise<any>{

    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Accept', 'application/json');

    const body = `grant_type=password&client_id=${environment.clientId}&client_secret=${environment.clientSecret}&username=${usuario}&password=${senha}&scopes=`;

    return this.http.post(this.oauthTokenUrl, body, {headers, withCredentials: true})
      .toPromise()
      .then(response => {
        this.armazenarToken((response as Token).access_token);

        this.http.get(this.usuarioPayloadUrl, {headers, withCredentials: true})
        .toPromise()
          .then(response => {

          })
          .catch(response => {
            const responseError = response.error;
            if (response.status === 400) {
              if (responseError.error === 'invalid_grant' || responseError.error === 'invalid_request') {
                return Promise.reject('Usuário ou senha inválida');
              }
            }
            return Promise.reject(response);
          });

      })
      .catch(response => {
        const responseError = response.error;
        if (response.status === 400) {
          if (responseError.error === 'invalid_grant' || responseError.error === 'invalid_request') {
            return Promise.reject('Usuário ou senha inválida');
          }
        }
        return Promise.reject(response);
      });
  }

  isAccessTokenInvalido(): boolean {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  obterNovoAccessToken(): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Accept', 'application/json');

      let refreshToken = null;

      if(this.getCookie('refresh_token')){
        refreshToken = JSON.parse(this.getCookie('refresh_token'));
      }

    const body = `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${environment.clientId}&client_secret=${environment.clientSecret}&scopes=`;

    return this.http.post(this.oauthTokenUrl, body, {headers, withCredentials: true})
      .toPromise()
      .then(response => {
        this.armazenarToken((response as Token).access_token);
      })
      .catch(response => {
        console.error('Não autorizado.', response.status);
      });
  }

  temPermissao(permissao: string): boolean {
    return JSON.parse(this.getCookie('payload'))
      .permissoes.includes(permissao);
  }

  temQualquerPermissao(permissoes: []): boolean {
      for (const permissao of permissoes) {
        if(this.temPermissao(permissao)){
          return true;
        }
      }
      return false;
  }

  private armazenarToken(token: string): void {
    localStorage.setItem('token', token); // Esse token fica armazenado no navegador do usuario
  }

  private armazenarRefreshToken(refreshToken: string): void {
    localStorage.setItem('refresh_token', refreshToken); // Esse token fica armazenado no navegador do usuario
  }

  private carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }
   getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  deleteCookie(cname: string) {
    let expires = "expires="+'expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = cname + "=" + '' + ";" + expires + ";path=/";
  }
}
