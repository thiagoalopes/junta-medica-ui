import { Cargos } from './cargos.model';
import { CargosService } from './../cargos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {

  public cargos: Cargos[];

  constructor(private cargosService: CargosService) { }

  ngOnInit(): void {
    this.listarCargos();
  }

  private listarCargos(){
    this.cargosService.listarCargos()
      .then((result)=>{
        this.cargos = result?result.data:null;
      })
  }

}
