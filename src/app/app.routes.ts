import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { ErrorComponent } from './componentes/error/error.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { loginsGuard } from './guards/logins.guard'; // Importa el guard de logins
import { ChatComponent } from './modules/juegos/componentes/chat/chat.component'; // Importa tu componente de chat



export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirige al home por defecto
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'quien-soy', component: QuienSoyComponent },
    { path: 'error', component: ErrorComponent },
   

    {
      path: 'juegos',
      loadChildren:()=>import('./modules/juegos/juegos.module').then(m =>m.JuegosModule),
      canActivate: [loginsGuard], // Aplicar el guard aca para todos los juegos

    },
       // Definir el chat fuera del 'juegos'
    {
        path: 'chat',
        component: ChatComponent,
        canActivate: [loginsGuard]
    },


    // Definir la encuesta
  //   {
  //     path: 'encuesta',
  //     component: EncuestaComponent,
  //     canActivate: [loginsGuard] // Solo accesible si el usuario está logueado
  // },
   
    { path: '**', redirectTo: '/error' } // Redireccionar cualquier ruta no encontrada al error
      
    ];
    





    

