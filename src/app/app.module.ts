import { CargosComponent } from './cargos/cargos/cargos.component';
import { CargosModule } from './cargos/cargos.module';
import { AuthGuard } from './seguranca/auth.guard';
import { SegurancaModule } from './seguranca/seguranca.module';
import { LoginComponent } from './seguranca/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'administracao/cargos',
    component: CargosComponent,
    canActivate: [AuthGuard],
    data: { roles: ['f_admin'] }
  },
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
