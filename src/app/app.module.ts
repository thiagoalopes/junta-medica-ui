import { CargosComponent } from './cargos/cargos/cargos.component';
import { CargosModule } from './cargos/cargos.module';
import { AuthGuard } from './seguranca/auth.guard';
import { SegurancaModule } from './seguranca/seguranca.module';
import { LoginComponent } from './seguranca/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NaoAtorizadoComponent } from './sahred/nao-atorizado/nao-atorizado.component';
import { DashboardComponent } from './sahred/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'administracao/cargos',
    component: CargosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['f_admin'] }
  },
  { path: 'administracao/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['f_admin'] }
  },
  { path: 'nao-autorizado', component: NaoAtorizadoComponent },
  { path: '**', redirectTo: '/administracao/dashboard' },

]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    SegurancaModule,
    CargosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
