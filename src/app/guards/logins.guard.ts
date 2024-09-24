// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthService } from '../services/auth.service'; // Inyecta tu servicio de autenticación

// export const loginsGuard: CanActivateFn = (route, state) => {

//   const authService = inject(AuthService); // Inyectamos el servicio de autenticación
//   const router = inject(Router); // Inyectamos el router para redireccionar si es necesario

//   if (authService.isLoggedIn()) {
//     return true; // Si el usuario está autenticado, permitir el acceso
//   } else {
//     router.navigate(['/login']); // Si no está autenticado, redirigir al login
//     return false;
//   } 

 
  
// };

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class loginsGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Permite el acceso
    } else {
      this.router.navigate(['/login']); // Redirige al login
      return false; // Bloquea el acceso
    }
  }
}



