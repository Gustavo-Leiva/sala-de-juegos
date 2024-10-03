import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // tener el servicio de autenticación
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { ChatComponent } from '../../modules/juegos/componentes/chat/chat.component';
import { JuegosModule } from '../../modules/juegos/juegos.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ChatComponent, RouterModule],
  templateUrl: './home.component.html',
  // styleUrl: './home.component.css'
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {}

 

  // Método para navegar a un destino específico
  goTo(path: string) {
     this.router.navigate([`/juegos/${path}`]);
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
  }


  // Método para navegar a un juego específico
  NavegarJuegos(game : string){
    if(this.authService.getUser() != null){
       this.router.navigate([`/juegos/${game}`]);
    }else{
      this.router.navigateByUrl("login")
    }
  }

   // Agrega otro método si necesitas navegar específicamente a resultados
   NavegarResultados() {
    this.router.navigate(['/resultado']); // Esto navega al componente de resultados
  }

  // Agrega otro método si necesitas navegar específicamente a encuestas
  NavegarEncuestas() {
    this.router.navigate(['/encuesta']); // Esto navega al componente de encuestas
  }
}
