import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Inyecta tu servicio de autenticación

export const loginsGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService); // Inyectamos el servicio de autenticación
  const router = inject(Router); // Inyectamos el router para redireccionar si es necesario

  if (authService.isLoggedIn()) {
    return true; // Si el usuario está autenticado, permitir el acceso
  } else {
    router.navigate(['/login']); // Si no está autenticado, redirigir al login
    return false;
  } 
};
