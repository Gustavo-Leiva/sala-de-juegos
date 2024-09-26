import { Component, OnInit, OnDestroy } from '@angular/core';
import { PreguntadosService } from '../../../../services/preguntados.service';
import { ResultadoService } from '../../../../services/resultado.service';


@Component({
  selector: 'app-preguntados',
  standalone: false,
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit, OnDestroy {
  pregunta: string = ''; // Para almacenar la pregunta actual
  opciones: string[] = []; // Opciones de respuesta
  imagen: string | null = null; // Imagen relacionada con la pregunta
  categoria: string = ''; // Nueva propiedad para la categoría
  mensajeResultado: string = ''; // Mensaje de resultado (ganaste/perdiste)
  respuestaCorrecta: string = ''; // La respuesta correcta
  tiempoRestante: number = 30; // Inicialmente, 30 segundos
  intervalo: any; // Guardar referencia al intervalo del temporizador
  respuestasCorrectas: number = 0; // Contador de respuestas correctas
  respuestaSeleccionada: boolean = false; // Para saber si se ha seleccionado una respuesta

  constructor(private preguntadosService: PreguntadosService, private resultadoService: ResultadoService) {}

  ngOnInit(): void {
    this.cargarPreguntaYImagen(); // Carga una nueva pregunta y una imagen al iniciar el componente
    this.iniciarTemporizador(); // Inicia el temporizador
  }

  cargarPreguntaYImagen(): void {
    // Llamada al servicio para obtener la pregunta
    this.preguntadosService.obtenerPregunta().subscribe(data => {
      const resultadoPregunta = data.results[0];

      // Decodificar la pregunta y las opciones
      this.pregunta = this.decodificarHtml(resultadoPregunta.question);
      this.opciones = resultadoPregunta.incorrect_answers.map((opcion: string) => this.decodificarHtml(opcion)); // Especificar el tipo aquí
      this.opciones.push(this.decodificarHtml(resultadoPregunta.correct_answer)); // Agregar la respuesta correcta
      this.opciones = this.opciones.sort(() => Math.random() - 0.5); // Mezcla las opciones aleatoriamente
      this.respuestaCorrecta = resultadoPregunta.correct_answer; // Asigna la respuesta correcta
      this.categoria = this.decodificarHtml(resultadoPregunta.category); // Asignar y decodificar la categoría
      this.mensajeResultado = ''; // Reiniciar el mensaje de resultado
      this.respuestaSeleccionada = false; // Reiniciar estado de respuesta seleccionada

      this.tiempoRestante = 30; // Reiniciar el tiempo a 30 segundos
      clearInterval(this.intervalo); // Limpiar el intervalo existente
      this.iniciarTemporizador(); // Iniciar el temporizador
    });

    // Llamada al servicio para obtener una imagen aleatoria
    this.preguntadosService.obtenerImagen().subscribe(response => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.imagen = reader.result as string; // Asignar la imagen al componente
      };
      reader.readAsDataURL(response); // Convierte el blob en una URL
    });
  }

  // verificarRespuesta(opcion: string): void {
  //   const esCorrecta = this.preguntadosService.verificarRespuesta(opcion, this.respuestaCorrecta);
  //   this.respuestaSeleccionada = true; // Indicar que se ha seleccionado una respuesta
  
  //   if (esCorrecta) {
  //     this.mensajeResultado = '¡Correcto!';
  //     this.respuestasCorrectas++; // Aumentar el contador de respuestas correctas
  //     setTimeout(() => this.cargarPreguntaYImagen(), 2000); // Cargar nueva pregunta después de 2 segundos
  //   } else {
  //     const respuestaCorrectaDecodificada = this.decodificarHtml(this.respuestaCorrecta); // Decodificar la respuesta correcta
  //     this.mensajeResultado = `¡Incorrecto! La respuesta correcta es: ${respuestaCorrectaDecodificada}`; // Mostrar la respuesta correcta
  //     clearInterval(this.intervalo); // Detener el temporizador al seleccionar una respuesta
  //   }
  // }

  verificarRespuesta(opcion: string): void {
    const esCorrecta = this.preguntadosService.verificarRespuesta(opcion, this.respuestaCorrecta);
    this.respuestaSeleccionada = true; // Indicar que se ha seleccionado una respuesta
    
    if (esCorrecta) {
      this.mensajeResultado = '¡Correcto!';
      this.respuestasCorrectas++; // Aumentar el contador de respuestas correctas
  
      // Continuar el juego con otra pregunta
      setTimeout(() => this.cargarPreguntaYImagen(), 2000); // Cargar nueva pregunta después de 2 segundos
    } else {
      const respuestaCorrectaDecodificada = this.decodificarHtml(this.respuestaCorrecta); // Decodificar la respuesta correcta
      this.mensajeResultado = `¡Incorrecto! La respuesta correcta es: ${respuestaCorrectaDecodificada}`; // Mostrar la respuesta correcta
      clearInterval(this.intervalo); // Detener el temporizador al seleccionar una respuesta
      
      // Guardar el puntaje solo al perder (cuando responde incorrectamente)
      this.guardarPuntaje();
    }
  }
  
  guardarPuntaje(): void {
    this.resultadoService.guardarResultado('Preguntados', this.respuestasCorrectas).then(() => {
      console.log('Resultado guardado correctamente');
    }).catch(error => {
      console.error('Error al guardar el resultado:', error);
    });
  }
  
 

  iniciarTemporizador(): void {
    // Inicia un intervalo que reduce el tiempo cada segundo
    this.intervalo = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        this.tiempoTerminado(); // Si se acaba el tiempo, ejecuta esta función
      }
    }, 1000);
  }

  // tiempoTerminado(): void {
  //   alert('¡El tiempo se ha acabado!'); // Alerta cuando el tiempo termina
  //   clearInterval(this.intervalo); // Detener el temporizador
  //   this.mensajeResultado = 'El tiempo se agotó.';
  //   this.respuestaSeleccionada = true; // Indicar que se ha seleccionado una respuesta
  // }


  tiempoTerminado(): void {
    alert('¡El tiempo se ha acabado!');
    clearInterval(this.intervalo); // Detener el temporizador
    this.mensajeResultado = 'El tiempo se agotó.';
    this.respuestaSeleccionada = true; // Indicar que se ha seleccionado una respuesta
  
    // Guardar el puntaje cuando se acaba el tiempo
    this.resultadoService.guardarResultado('Preguntados', this.respuestasCorrectas).then(() => {
      console.log('Resultado guardado correctamente al finalizar el tiempo');
    }).catch(error => {
      console.error('Error al guardar el resultado:', error);
    });
  }
  

  reiniciarJuego(): void {
    this.tiempoRestante = 30; // Reinicia el tiempo a 30 segundos
    this.respuestasCorrectas = 0; // Reiniciar contador de respuestas correctas
    clearInterval(this.intervalo); // Detiene el temporizador actual
    this.cargarPreguntaYImagen(); // Carga una nueva pregunta
    this.iniciarTemporizador(); // Reinicia el temporizador
    this.respuestaSeleccionada = false; // Reiniciar estado de respuesta seleccionada
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo); // Limpiar el intervalo al destruir el componente
  }

  // Método para decodificar HTML
  decodificarHtml(html: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
  }
}




