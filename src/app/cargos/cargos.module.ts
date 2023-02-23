import { CargosService } from './cargos.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargosComponent } from './cargos/cargos.component';
import { SahredModule } from '../sahred/sahred.module';



@NgModule({
  declarations: [
    CargosComponent,
  ],
  imports: [
    CommonModule,
    SahredModule

  ],
  providers:[
    CargosService
  ]
})
export class CargosModule { }
