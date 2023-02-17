import { Router } from '@angular/router';
import { Usuario } from './../usuario.model';
import {Component} from '@angular/core';
import {AuthService} from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    //public form: FormGroup;
    //public settings: Settings;
    // public loginInvalid: boolean = true;
    // public carregando: boolean = true;
    // public cor = '#ffffff';
    // public hide = true;

    cpf: string = '';
    senha: string = '';
    usuario: Usuario = new Usuario;

    constructor(private authService: AuthService, private router: Router){}

    entrar(){
      this.authService.login(this.cpf, this.senha)
      .then(()=>{
        this.router.navigate(['/administracao/cargos']);
      });
    }

    // constructor(
    //     public appSettings: AppSettings,
    //     public fb: FormBuilder,
    //     public router: Router,
    //     private auth: AuthService,
    //     private errorHandlerService: ErrorHandlerService,
    //     ) {
    //     this.settings = this.appSettings.settings;
    //     this.form = this.fb.group({
    //         cpf: [null, Validators.compose([Validators.required,])],
    //         password: [null, Validators.compose([Validators.required, Validators.minLength(5)])]
    //     });
    // }

    // formataCPF(cpf): string {
    //     // retira os caracteres indesejados...
    //     cpf = cpf.replace(/[^\d]/g, '');

    //     // realizar a formatação...
    //     return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').toString();
    // }

//     public onSubmit(values): void {
//         if (this.form.valid) {
// //      this.router.navigate(['/']);
//             try {
//                 this.carregando = true;
//                 this.cor = '#283593';
//                 const cpf = this.form.get('cpf').value;
//                 const senha = this.form.get('password').value;
//                 this.auth.login(this.formataCPF(cpf), senha)
//                     .then(() => {
//                         this.carregando = false;
//                         this.router.navigate(['/dashboard']);
//                         // this.carregando = false;
//                     })
//                     .catch(erro => {
//                         // this.loginInvalid = true;
//                         this.carregando = false;
//                         // this.carregandoButton = true;
//                         this.cor = '#ffffff';
//                         this.errorHandlerService.handle(erro);
//                     });
//             } catch (err) {
//                 // this.loginInvalid = true;
//                 this.carregando = false;
//                 this.cor = '#ffffff';
//                 // this.carregandoButton = true;
//             }
//         }
//     }

//     ngAfterViewInit() {
//         this.settings.loadingSpinner = false;
//     }
}
