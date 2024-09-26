import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResultadoService } from '../../../../services/resultado.service'; // Asegúrate de tener la ruta correcta
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-cazador',
  standalone: true,
  imports: [CommonModule, RouterModule, AngularFirestoreModule],
  templateUrl: './cazador.component.html',
  styleUrls: ['./cazador.component.css']
})


export class CazadorComponent implements OnInit {
  posX: number = 0;
  posY: number = 0;
  puntaje: number = 0; // Variable para almacenar el puntaje
  intervaloMovimiento: any;
  gameOver: boolean = false;
  tiempoRestante: number = 30; // Duración del juego en segundos
  mostrarTitulo: boolean = true; // Nueva propiedad para mostrar/ocultar el título

  // Inyecta el servicio de resultados en el constructor
  constructor(private resultadoService: ResultadoService) {}


  ngOnInit(): void {
    this.iniciarJuego();

   
  }


  iniciarJuego(): void {
    this.gameOver = false;
    this.mostrarTitulo = true; // Mostrar el título al inicio
    this.tiempoRestante = 30; // Reinicia el tiempo
    this.puntaje = 0; // Reinicia el puntaje

      // Ocultar el título después de 2 segundos
      setTimeout(() => {
        this.mostrarTitulo = false;
      }, 2000);

    // Iniciar el movimiento de la figura
    this.intervaloMovimiento = setInterval(() => {
      this.moverFigura();
    }, 1000); // Cambia la figura de posición cada segundo

    // Iniciar temporizador del juego
    this.temporizador();
  }

  moverFigura(): void {
    const contenedor = document.querySelector('.contenedor-juego') as HTMLElement;

    if (contenedor) {
      const contenedorWidth = contenedor.clientWidth;
      const contenedorHeight = contenedor.clientHeight;
      const figuraSize = 50; // Tamaño de la figura

      // Calcular nueva posición aleatoria dentro del área visible del contenedor
      this.posX = Math.random() * (contenedorWidth - figuraSize);
      this.posY = Math.random() * (contenedorHeight - figuraSize);
    } else {
      console.error('El contenedor no se encontró');
    }
  }

  temporizador(): void {
    const interval = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        clearInterval(interval);
        this.finalizarJuego();
      }
    }, 1000); // Resta un segundo cada vez
  }

  calcularProgreso(): number {
    // Calcula el porcentaje del tiempo restante para actualizar la barra de progreso
    return (this.tiempoRestante / 30) * 100;
  }
  cazarFigura(): void {
    // Incrementa el puntaje cada vez que se hace clic en la figura
    if (!this.gameOver) {
      this.puntaje++;
      this.moverFigura(); // Mueve la figura inmediatamente después de capturarla
    }
  }

  finalizarJuego(): void {
    this.gameOver = true;
    clearInterval(this.intervaloMovimiento); // Detiene el movimiento de la figura
  
  // Guardar el resultado al finalizar el juego
  this.resultadoService.guardarResultado('Cazador de Círculos', this.puntaje);
  
  }

  reiniciarJuego(): void {
    this.iniciarJuego(); // Reinicia todo
  }
}
