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
  userInfoUrl: string;
  jwtPayload: any;
  authorities: [];

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) {
    this.oauthTokenUrl = `${environment.apiUrl}/api/oauth/token`;
    this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
    this.userInfoUrl = `${environment.apiUrl}/api/auth/usuarios/logado`;
    this.carregarToken();
  }

  logout(): Promise<void>{
    return this.http.delete(this.tokensRevokeUrl, {withCredentials: true})
      .toPromise()
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        this.jwtPayload = null;
      });
  }

  login(usuario: string, senha: string): Promise<any>{

    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Accept', 'application/json');

    const body = `grant_type=password&client_id=${environment.clientId}&client_secret=${environment.clientSecret}&username=${usuario}&password=${senha}&scopes=`;

    return this.http.post(this.oauthTokenUrl, body, {headers, withCredentials: false})
      .toPromise()
      .then(response => {
        this.armazenarToken((response as Token).access_token);
        this.armazenarRefreshToken((response as Token).refresh_token);
        this.jwtPayload = (response as Token).data;
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

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  limparRefreshToken() {
    localStorage.removeItem('refresh_token');
    this.jwtPayload = null;
  }

  obterNovoAccessToken(): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Accept', 'application/json');

    const body = `grant_type=refresh_token&refresh_token=${localStorage.getItem('refresh_token')}&username=${this.jwtPayload}&client_id=${environment.clientId}&client_secret=${environment.clientSecret}&scopes=`;

    return this.http.post(this.oauthTokenUrl, body, {headers, withCredentials: false})
      .toPromise()
      .then(response => {
        this.armazenarToken((response as Token).access_token);
        this.armazenarRefreshToken((response as Token).refresh_token);
      })
      .catch(response => {
        console.error('Não autorizado.', response.status);
      });
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.permissoes.includes(permissao);
  }

  temQualquerPermissao(permissoes: []): boolean {
    for (const permissao of permissoes) {
      if (this.temPermissao(permissao)) {
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
}
