import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router
import { ResultadoService } from '../../../../services/resultado.service'; // Asegúrate de importar tu servicio

@Component({
  selector: 'app-ahorcado',
  standalone: false,
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {
  // Propiedades del juego
  private readonly palabras: string[] = [
    'ANGULAR', 
    'JAVASCRIPT', 
    'TYPESCRIPT', 
    'PROGRAMACION', 
    'AHORCADO'
  ];
  
  public palabraSecreta: string = '';
  public palabraMostrada: string[] = [];
  public abecedario: string[] = [];
  public letrasUsadas: string[] = [];
  public errores: number = 0;
  private readonly maxErrores: number = 6;
  public juegoTerminado: boolean = false;
  public mensaje: string = '';
  public respuestasCorrectas: number = 0; // Contador de respuestas correctas
  private resultadoGuardado: boolean = false; // Nueva variable para controlar el estado

  // Rutas de las imágenes del ahorcado
  public readonly imagenesAhorcado: string[] = [
    '/assets/imagenes/etapasAhorcado/ahorcado0.png',
    '/assets/imagenes/etapasAhorcado/ahorcado1.png',
    '/assets/imagenes/etapasAhorcado/ahorcado2.png',
    '/assets/imagenes/etapasAhorcado/ahorcado3.png',
    '/assets/imagenes/etapasAhorcado/ahorcado4.png',
    '/assets/imagenes/etapasAhorcado/ahorcado5.png',
    '/assets/imagenes/etapasAhorcado/ahorcado6.png'
  ];

  constructor(private resultadoService: ResultadoService, private router: Router) {}

  ngOnInit() {
    this.iniciarJuego(); // Iniciar juego al cargar el componente
  }

  // Asegúrate de que el método iniciarJuego restablezca todas las propiedades necesarias
 private iniciarJuego(): void {
    this.palabraSecreta = this.seleccionarPalabraSecreta();
    this.palabraMostrada = Array(this.palabraSecreta.length).fill('_');
    this.abecedario = this.generarAbecedario();
    this.letrasUsadas = [];
    this.errores = 0;
    this.juegoTerminado = false;
    this.mensaje = '';
    this.respuestasCorrectas = 0; // Reiniciar el contador al iniciar el juego
}

  private seleccionarPalabraSecreta(): string {
    return this.palabras[Math.floor(Math.random() * this.palabras.length)].toUpperCase();
  }

  private generarAbecedario(): string[] {
    return 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  }

  // Modifica el método seleccionarLetra
  public seleccionarLetra(letra: string): void {
    // Verifica si la letra ya fue usada o si el juego ha terminado
    if (this.letrasUsadas.includes(letra) || this.juegoTerminado) return;

    // Añade la letra seleccionada a las letras usadas
    this.letrasUsadas.push(letra);

    // Verifica si la letra está en la palabra secreta
    if (this.palabraSecreta.includes(letra)) {
        this.actualizarPalabraMostrada(letra);

        // Verifica si se ha ganado
        if (!this.palabraMostrada.includes('_')) {
            this.respuestasCorrectas++; // Solo sumar 1 punto por palabra completa
            this.mensaje = 'GANASTE!!! ¡Sigue jugando!';
            // Aquí puedes iniciar una nueva ronda
            this.iniciarNuevaRonda(); // Reiniciar el juego para una nueva ronda
        }
    } else {
        this.errores++;
        // Verifica si se ha perdido
        if (this.errores >= this.maxErrores) {
            this.finalizarJuego('PERDISTE :/');
        }
    }
}


private iniciarNuevaRonda(): void {
    // Aquí se restablecen las propiedades necesarias para iniciar una nueva ronda
    this.palabraSecreta = this.seleccionarPalabraSecreta();
    this.palabraMostrada = Array(this.palabraSecreta.length).fill('_');
    this.letrasUsadas = [];
    this.errores = 0; // Reiniciar errores para la nueva ronda
    this.juegoTerminado = false; // Asegurarse de que el juego no esté terminado
    this.mensaje = ''; // Limpiar el mensaje
}


  private actualizarPalabraMostrada(letra: string): void {
    for (let i = 0; i < this.palabraSecreta.length; i++) {
      if (this.palabraSecreta[i] === letra) {
        this.palabraMostrada[i] = letra;
      }
    }
  }

  private finalizarJuego(mensajeFinal: string): void {
    if (!this.juegoTerminado) { // Asegúrate de que el juego no esté ya terminado
        this.juegoTerminado = true;
        this.mensaje = mensajeFinal;
        this.guardarResultado(); // Guardar resultado al finalizar el juego
    }
}


  private guardarResultado(): void {
    this.resultadoService.guardarResultado('Ahorcado', this.respuestasCorrectas)
      .then(() => console.log('Resultado guardado correctamente'))
      .catch(error => console.error('Error al guardar el resultado:', error));
  }

// Reinicia el juego completamente
public reiniciarJuego(): void {
  this.iniciarJuego(); // Reiniciar el juego
}



public salirJuego(): void {
  if (!this.juegoTerminado && !this.resultadoGuardado) { // Verifica que no se haya guardado antes
      console.log('Guardando resultado y saliendo del juego...'); // Log para depuración
      this.guardarResultado(); // Guardar resultado al salir
      this.resultadoGuardado = true; // Marca el resultado como guardado
  }

  this.juegoTerminado = true; // Finaliza el juego
  this.mensaje = 'Juego terminado. Gracias por jugar!';

  // Redirigir a la página de inicio después de guardar el resultado
  setTimeout(() => {
      // Aquí puedes usar el router para navegar al home
      this.router.navigate(['/home']); // Asegúrate de inyectar el Router en el constructor
  }, 1000); // Espera un segundo antes de redirigir (opcional)
}

}


