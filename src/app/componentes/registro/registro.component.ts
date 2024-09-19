import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router'; // Importa Router para redirigir
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'], //
})
export class RegistroComponent {
  newUserMail: string = '';
  newUserPWD: string = '';

  loggedUser: string = '';
  flagError: boolean = false;
  msjError: string = '';
  msjExito: string = ''; // Para mostrar el mensaje de éxito

  constructor(public auth: Auth, private router: Router) {} // Inyectar Router

  Register() {
    createUserWithEmailAndPassword(this.auth, this.newUserMail, this.newUserPWD)
      .then((res) => {
        if (res.user.email !== null) {
          this.loggedUser = res.user.email;
          // Redirigir al usuario al home después del registro exitoso
          this.flagError = false;
             // Mostrar el mensaje de éxito
             this.msjExito = 'Usuario registrado con éxito';
          
             // Esperar 2 segundos antes de redirigir al home
             setTimeout(() => {
               this.router.navigate(['/home']);
             }, 2000); // 2000 milisegundos = 2 segundos
           }
          
                   
      })
      .catch((e) => {
        this.flagError = true;

        console.log(e)

        //manejo de errores
        switch (e.code) {
          case 'auth/invalid-email':
            this.msjError = 'Email invalido';
            break;
          case 'auth/email-already-in-use':
            this.msjError = 'Email ya en uso';
            break;
          case 'auth/weak-password':
            this.msjError = 'La contraseña debe ser de mas de 6 caracteres';
            break;
          case 'auth/missing-password':
            this.msjError = 'Por favor introduzca una contraseña';
            break;
          default:
            this.msjError = e.code;
            break;
        }
      });
  }

 
}
