import { Component } from '@angular/core';
import { Cartas } from '../models/cartas';
import { CardService } from '../../../../services/card.service';
import { ResultadoService } from '../../../../services/resultado.service';

@Component({
  selector: 'app-mayor-menor',
  standalone: false,
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent {
  public existeNuevaCarta: boolean = false;
  public nombreDeMazo!: string;
  public ultimaCarta!: Cartas;
  public nuevaCarta!: Cartas;
  public puntaje: number = 0;
  public intentosRestantes: number = 3; // Nuevos intentos
  mensajeResultado: string | null = null; // Inicialmente null
  public puntajeMaximo: number = 0; // Almacena el puntaje máximo
  public juegoTerminado: boolean = false; // Indica si el juego ha terminado

    // Inyecta el servicio de resultados en el constructor
    
  constructor(private cartasService: CardService, private resultadoService: ResultadoService) {
    this.cartasService.crearMazo();
    this.ultimaCarta = new Cartas('', '');
    this.nuevaCarta = new Cartas('', '');
  }

  ngOnInit(): void {
    this.cartasService.ultimaCarta.subscribe(respuesta => {
      this.ultimaCarta = new Cartas((respuesta as any).value, (respuesta as any).image);
    });
    this.cartasService.nuevaCarta.subscribe(respuesta => {
      this.nuevaCarta = new Cartas((respuesta as any).value, (respuesta as any).image);
    });
  }

  // sacarNuevaCarta(parametro: string) {
  //   if (this.intentosRestantes > 0) {
  //     this.nombreDeMazo = this.cartasService.nombreMazo;
  //     this.existeNuevaCarta = true;
  //     this.validarTamaño(this.ultimaCarta, this.nuevaCarta, parametro);
  //   } else {
  //     this.mensajeResultado = '¡No te quedan intentos!'; // Mensaje cuando ya no hay intentos
  //   }
  // }


  sacarNuevaCarta(parametro: string) {
    if (this.intentosRestantes > 0 && !this.juegoTerminado) {
      this.nombreDeMazo = this.cartasService.nombreMazo;
      this.existeNuevaCarta = true;
      this.validarTamaño(this.ultimaCarta, this.nuevaCarta, parametro);
    } else if (this.juegoTerminado) {
      this.mensajeResultado = '¡El juego ya ha terminado! Haz clic en Reiniciar para comenzar de nuevo.';
    } else {
      this.mensajeResultado = '¡No te quedan intentos!'; // Mensaje cuando ya no hay intentos
    }
  }
 

  // validarTamaño(carta1: Cartas, carta2: Cartas, parametro: string) {
  //   let comparacion: string = "igual";
  //   if (parseInt(carta2.valor) > parseInt(carta1.valor)) {
  //     comparacion = "mayor";
  //   } else if (parseInt(carta2.valor) < parseInt(carta1.valor)) {
  //     comparacion = "menor";
  //   }
  
  //   if (parametro === comparacion) {
  //     this.puntaje++;
  //     // Actualiza el puntaje máximo si el actual es mayor
  //     if (this.puntaje > this.puntajeMaximo) {
  //       this.puntajeMaximo = this.puntaje;
  //     }
  //     this.mensajeResultado = '¡GANASTE!!!'; // Mensaje de victoria
  //   } else {
  //     this.resultadoService.guardarResultado('Mayor o Menor', this.puntajeMaximo); // Guardar puntaje máximo
  //     this.mensajeResultado = 'PERDISTE!!'; // Mensaje de derrota
  //     this.puntaje = 0; // Reinicia el puntaje actual
  //   }
  
  //   // Ocultar el mensaje después de 2 segundos
  //   setTimeout(() => {
  //     this.mensajeResultado = null; // Reinicia el mensaje
  //     this.existeNuevaCarta = false;
  //     this.ultimaCarta = this.nuevaCarta;
  //     this.cartasService.obtenerCarta(this.nombreDeMazo);
  //   }, 2000);
  // }




//   validarTamaño(carta1: Cartas, carta2: Cartas, parametro: string) {
//     let comparacion: string = "igual";
//     if (parseInt(carta2.valor) > parseInt(carta1.valor)) {
//       comparacion = "mayor";
//     } else if (parseInt(carta2.valor) < parseInt(carta1.valor)) {
//       comparacion = "menor";
//     }

//     if (parametro === comparacion) {
//       this.puntaje++;
//       if (this.puntaje > this.puntajeMaximo) {
//         this.puntajeMaximo = this.puntaje;
//       }
//       this.mensajeResultado = '¡GANASTE!!!'; // Mensaje de victoria
//     } else {
//       this.intentosRestantes--; // Resta un intento
//       if (this.intentosRestantes > 0) {
//         this.mensajeResultado = `Fallaste! Te quedan ${this.intentosRestantes} intentos.`; // Muestra intentos restantes
//       } else {
//         this.mensajeResultado = 'PERDISTE!!'; // Mensaje de derrota
//         this.resultadoService.guardarResultado('Mayor o Menor', this.puntajeMaximo); // Guarda puntaje máximo
//         this.puntaje = 0; // Reinicia el puntaje actual
//       }
//     }

//     setTimeout(() => {
//       this.mensajeResultado = null; // Reinicia el mensaje
//       this.existeNuevaCarta = false;
//       this.ultimaCarta = this.nuevaCarta;
//       this.cartasService.obtenerCarta(this.nombreDeMazo);
//     }, 2000);
//   }
  

    


//   reiniciar() {
//     this.puntaje = 0;
//     this.existeNuevaCarta = false;
//     this.cartasService.crearMazo();
//     this.mensajeResultado = null; // Reinicia el mensaje
//   }
// }



validarTamaño(carta1: Cartas, carta2: Cartas, parametro: string) {
  let comparacion: string = "igual";
  if (parseInt(carta2.valor) > parseInt(carta1.valor)) {
    comparacion = "mayor";
  } else if (parseInt(carta2.valor) < parseInt(carta1.valor)) {
    comparacion = "menor";
  }

  if (parametro === comparacion) {
    this.puntaje++;
    if (this.puntaje > this.puntajeMaximo) {
      this.puntajeMaximo = this.puntaje;
    }
    this.mensajeResultado = '¡GANASTE!!!'; // Mensaje de victoria
  } else {
    this.intentosRestantes--; // Resta un intento
    if (this.intentosRestantes > 0) {
      this.mensajeResultado = `Fallaste! Te quedan ${this.intentosRestantes} intentos.`; // Muestra intentos restantes
    } else {
      this.mensajeResultado = 'PERDISTE!!'; // Mensaje de derrota
      this.resultadoService.guardarResultado('Mayor o Menor', this.puntajeMaximo); // Guarda puntaje máximo
      this.juegoTerminado = true; // Marca el juego como terminado
    }
  }

  setTimeout(() => {
    if (!this.juegoTerminado) {
      this.mensajeResultado = null; // Reinicia el mensaje
      this.existeNuevaCarta = false;
      this.ultimaCarta = this.nuevaCarta;
      this.cartasService.obtenerCarta(this.nombreDeMazo);
    }
  }, 2000);
}

reiniciar() {
  this.puntaje = 0;
  this.intentosRestantes = 3; // Reinicia intentos
  this.juegoTerminado = false; // Reinicia el estado del juego
  this.existeNuevaCarta = false;
  this.cartasService.crearMazo();
  this.mensajeResultado = null; // Reinicia el mensaje
}
}
