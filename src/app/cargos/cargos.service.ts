import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  private cargosUrl: string = `${environment.apiUrl}/api/administracao/cargos`;

  constructor(
    private httpClient: HttpClient,
  ) { }

  public listarCargos(): Promise<any> {

    let headers = new HttpHeaders();
    headers = headers
      .set('Accept', 'application/json');

    return this.httpClient.get(this.cargosUrl, { headers, withCredentials: true })
      .toPromise()
      .then((response)=>{
        return response;
      }).catch((error)=>{
        return null;
      });
  }
}
