import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

// Propiedades para el formulario de inicio de sesión
email: string ="";
password: string ="";
usuario: Usuario = new Usuario(this.email, this.password); // Instancia de Usuario

// Credenciales guardadas (para prueba)
private nombre: string = 'leiva';
private clave: string = '1234';


// Inyecta Router en el constructor
constructor(private router: Router) {}

// Método para manejar el envío del formulario
   enviarFormulario(){

    this.usuario = new Usuario(this.email, this.password);

    if (this.usuario.nombre  === this.email && this.usuario.clave === this.password) {
      // Por ejemplo, redirigir a otra página si el inicio de sesión es exitoso
      this.router.navigate(['/home']);
    } else {
      // Redirige a la página de error si el login falla
      this.router.navigate(['/error']);
    }

   }   
}
