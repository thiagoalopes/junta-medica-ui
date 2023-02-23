import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NaoAtorizadoComponent } from './nao-atorizado/nao-atorizado.component';
import { NavegacaoComponent } from './navegacao/navegacao.component';



@NgModule({
  declarations: [
    DashboardComponent,
    NaoAtorizadoComponent,
    NavegacaoComponent
  ],
  imports: [
    CommonModule,
    RouterModule

  ],
  exports: [
    DashboardComponent,
    NaoAtorizadoComponent,
    NavegacaoComponent
  ]
})
export class SahredModule { }
