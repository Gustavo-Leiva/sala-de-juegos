import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { collection } from 'firebase/firestore';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { Firestore, addDoc } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

// Propiedades para el formulario de inicio de sesión
email: string = "";
password : string = "";
flagError : boolean = false;
loggedUser: string = "";
msjError : string = "";



usuario: Usuario = new Usuario(this.email, this.password); // Instancia de Usuario

// Inyecta Router en el constructor
// Instancia firestore y se importa la libreria @angular/fire/firestore para poder leer y escribir.
constructor(private router: Router, private auth: AuthService, private firestore : Firestore) {}


async LoginUser() {
  this.auth.isLoading = true; // Activa el spinner
  // this.flagError = false; // Resetea el estado de error
  // this.msjError = ""; // Resetea el mensaje de error

  try {
    await this.auth.Login(this.email, this.password);

    // Mínimo tiempo de espera antes de redirigir
    // const spinnerDuration = 2000; // 2 segundos
    // await new Promise(resolve => setTimeout(resolve, spinnerDuration));

    this.router.navigate(['/home']); // Redirige al home después de iniciar sesión
  } catch (e) {
    console.log('Error de autenticación:', e);
    this.flagError = true;
    this.msjError = this.getErrorMessage(e);
  }
  finally {
   this.auth.isLoading = false; // Desactiva el spinner  
  }
}

getErrorMessage(error: any): string {
  switch (error.code) {
    case "auth/invalid-email":
      return "Email invalido";
    case "auth/invalid-credential":
      return "El email o contraseña son incorrectos";
    case "auth/missing-password":
      return "Por favor introduzca una contraseña";
    case "auth/too-many-requests":
        return "Demasiados intentos de inicio de sesión fallidos. Intenta de nuevo más tarde o restablece tu contraseña.";
    default:
      return "Error desconocido";
  }
}

// Getter para acceder a isLoading desde el template
get isLoading(): boolean {
  return this.auth.isLoading;
}

  UsuarioDefecto(){
    this.email = "invitado@gmail.com";
    this.password = "invitado";
      
   }

   
  
   goTo(path : string)
    {
      this.router.navigate([path]);
    }
  
}

