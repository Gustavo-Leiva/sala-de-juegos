import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  standalone: false,
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {
  palabras: string[] = ['ANGULAR', 'JAVASCRIPT', 'TYPESCRIPT', 'PROGRAMACION', 'AHORCADO']; // Lista de palabras
  palabraSecreta: string = ''; // La palabra secreta seleccionada al azar
  palabraMostrada: string[] = []; // El progreso de la palabra
  abecedario: string[] = []; // Letras del abecedario
  letrasUsadas: string[] = []; // Letras ya seleccionadas
  errores = 0; // Número de errores cometidos
  maxErrores = 6; // Máximo de errores permitidos
  juegoTerminado = false;
  mensaje = ''; // Mensaje de victoria o derrota
  imagenesAhorcado: string[] = [ // Imágenes del ahorcado
    '/assets/imagenes/etapasAhorcado/ahorcado0.png',
    '/assets/imagenes/etapasAhorcado/ahorcado1.png',
    '/assets/imagenes/etapasAhorcado/ahorcado2.png',
    '/assets/imagenes/etapasAhorcado/ahorcado3.png',
    '/assets/imagenes/etapasAhorcado/ahorcado4.png',
    '/assets/imagenes/etapasAhorcado/ahorcado5.png',
    '/assets/imagenes/etapasAhorcado/ahorcado6.png'
  ];

  constructor() {
    this.abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  }

  ngOnInit() {
    this.reiniciarJuego();
  }

  // Inicializa el juego y selecciona una nueva palabra al azar
  reiniciarJuego() {
    // Selecciona una palabra al azar de la lista
    this.palabraSecreta = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    
    // Inicializa la palabra mostrada con guiones bajos
    this.palabraMostrada = this.palabraSecreta.split('').map(() => '_');
    
    this.letrasUsadas = [];
    this.errores = 0;
    this.juegoTerminado = false;
    this.mensaje = '';
  }

  // Se ejecuta cuando se selecciona una letra
  seleccionarLetra(letra: string) {
    if (this.juegoTerminado) {
      return; // Si el juego terminó, no permitir más interacción
    }

    // Agrega la letra a la lista de letras usadas
    this.letrasUsadas.push(letra);

    // Verificar si la letra está en la palabra
    if (this.palabraSecreta.includes(letra)) {
      this.actualizarPalabraMostrada(letra);
      if (this.palabraMostrada.join('') === this.palabraSecreta) {
        this.juegoTerminado = true;
        this.mensaje = '¡Ganaste!';
      }
    } else {
      this.errores++;
      if (this.errores >= this.maxErrores) {
        this.juegoTerminado = true;
        this.mensaje = '¡Perdiste! La palabra era: ' + this.palabraSecreta;
      }
    }
  }

  // Actualiza la palabra mostrada cuando se acierta una letra
  actualizarPalabraMostrada(letra: string) {
    for (let i = 0; i < this.palabraSecreta.length; i++) {
      if (this.palabraSecreta[i] === letra) {
        this.palabraMostrada[i] = letra;
      }
    }
  }
}
