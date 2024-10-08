import { Component, OnInit, OnDestroy } from '@angular/core';
import { PreguntadosService } from '../../../../services/preguntados.service';
import { ResultadoService } from '../../../../services/resultado.service';

interface Pais {
  name: { common: string };
  flags: { png: string };
  translations?: { spa?: { common: string } }; // Agregar traducciones
}

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit, OnDestroy {
  paisActual: Pais | undefined;
  opciones: string[] = []; // Opciones de países
  mensajeResultado: string = ''; // Mensaje de resultado
  tiempoRestante: number = 15; // Inicialmente, 15 segundos
  intervalo: any; // Guardar referencia al intervalo del temporizador
  respuestasCorrectas: number = 0; // Contador de respuestas correctas
  juegoTerminado: boolean = false; // Para saber si el juego ha terminado

  constructor(private preguntadosService: PreguntadosService, private resultadoService: ResultadoService) {}

  ngOnInit(): void {
    this.iniciarJuego(); // Iniciar el juego al cargar el componente
  }

  iniciarJuego(): void {
    this.respuestasCorrectas = 0; // Reiniciar el contador de respuestas correctas
    this.juegoTerminado = false; // Reiniciar estado de juego
    this.cargarNuevaPregunta(); // Cargar la primera pregunta
    this.iniciarTemporizador(); // Iniciar el temporizador
  }

  cargarNuevaPregunta(): void {
    if (this.juegoTerminado) return; // Si el juego ya terminó, no cargar nuevas preguntas

    this.preguntadosService.getPaises().subscribe(paises => {
      if (paises.length > 0) {
        // Elegir un país aleatorio
        const randomIndex = Math.floor(Math.random() * paises.length);
        this.paisActual = paises[randomIndex];

        // Elegir tres opciones incorrectas al azar
        this.opciones = paises
          .filter(p => p !== this.paisActual) // Filtrar para no incluir el país correcto
          .sort(() => 0.5 - Math.random()) // Barajar
          .slice(0, 3) // Tomar 3 países
          .map(p => p.translations?.spa?.common || p.name.common); // Obtener sus nombres en español

        // Incluir la opción correcta
        this.opciones.push(this.paisActual.translations?.spa?.common || this.paisActual.name.common);
        this.opciones.sort(() => 0.5 - Math.random()); // Barajar las opciones

        this.mensajeResultado = ''; // Reiniciar mensaje de resultado
      }
    });
  }

  iniciarTemporizador(): void {
    this.intervalo = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--; // Decrementar el tiempo
      } else {
        this.tiempoTerminado(); // Si se acaba el tiempo, ejecutar esta función
      }
    }, 1000);
  }

  verificarRespuesta(opcion: string): void {
    if (this.juegoTerminado) return; // Si el juego ya terminó, no verificar respuesta

    clearInterval(this.intervalo); // Detener el temporizador al verificar respuesta

    const respuestaCorrecta = this.paisActual?.translations?.spa?.common || this.paisActual?.name.common;

    if (opcion === respuestaCorrecta) {
      this.mensajeResultado = '¡Correcto!';
      this.respuestasCorrectas++; // Incrementar el contador de respuestas correctas
    } else {
      this.mensajeResultado = `¡Incorrecto! La respuesta correcta es: ${respuestaCorrecta}`;
    }

    setTimeout(() => this.cargarNuevaPregunta(), 1000); // Nueva pregunta tras 2 segundos
    this.iniciarTemporizador(); // Reiniciar el temporizador para la nueva pregunta
  }

  tiempoTerminado(): void {
    clearInterval(this.intervalo); // Limpiar el intervalo
    this.mensajeResultado = '¡El tiempo se ha acabado!'; // Mensaje de tiempo agotado
    this.mensajeResultado += ` Has respondido correctamente ${this.respuestasCorrectas} preguntas.`;
    this.juegoTerminado = true; // Marcar que el juego ha terminado

    // Llamar a guardarPuntaje() cuando se termina el juego
    this.guardarPuntaje();
  }

  guardarPuntaje(): void {
    this.resultadoService.guardarResultado('Preguntados', this.respuestasCorrectas).then(() => {
      console.log('Resultado guardado correctamente');
    }).catch(error => {
      console.error('Error al guardar el resultado:', error);
    });
  }

  reiniciarJuego(): void {
    this.tiempoRestante = 15; // Reiniciar tiempo
    this.iniciarJuego(); // Reiniciar el juego
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo); // Limpiar el intervalo al destruir el componente
  }
}




