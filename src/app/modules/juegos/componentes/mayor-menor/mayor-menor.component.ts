import { Component } from '@angular/core';
import { Cartas } from '../models/cartas';
import { CardsService } from '../../../../services/card.service';
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
  mensajeResultado: string | null = null; // Inicialmente null
  public puntajeMaximo: number = 0; // Almacena el puntaje máximo

    // Inyecta el servicio de resultados en el constructor
    
  constructor(private cartasService: CardsService, private resultadoService: ResultadoService) {
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

  sacarNuevaCarta(parametro: string) {
    this.nombreDeMazo = this.cartasService.nombreMazo;
    this.existeNuevaCarta = true;
    this.validarTamaño(this.ultimaCarta, this.nuevaCarta, parametro);
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
  //     this.mensajeResultado = '¡GANASTE!!!'; // Mensaje de victoria
  //     if (this.puntaje === 10) {
  //       this.mensajeResultado = '¡Felicidades! Has alcanzado 10 puntos!';
  //     }
  //   } else {
  //     this.puntaje = 0;
  //     this.mensajeResultado = 'PERDISTE!!'; // Mensaje de derrota
  //   }


  validarTamaño(carta1: Cartas, carta2: Cartas, parametro: string) {
    let comparacion: string = "igual";
    if (parseInt(carta2.valor) > parseInt(carta1.valor)) {
      comparacion = "mayor";
    } else if (parseInt(carta2.valor) < parseInt(carta1.valor)) {
      comparacion = "menor";
    }
  
    if (parametro === comparacion) {
      this.puntaje++;
      // Actualiza el puntaje máximo si el actual es mayor
      if (this.puntaje > this.puntajeMaximo) {
        this.puntajeMaximo = this.puntaje;
      }
      this.mensajeResultado = '¡GANASTE!!!'; // Mensaje de victoria
    } else {
      this.resultadoService.guardarResultado('Mayor o Menor', this.puntajeMaximo); // Guardar puntaje máximo
      this.mensajeResultado = 'PERDISTE!!'; // Mensaje de derrota
      this.puntaje = 0; // Reinicia el puntaje actual
    }
  
    // Ocultar el mensaje después de 2 segundos
    setTimeout(() => {
      this.mensajeResultado = null; // Reinicia el mensaje
      this.existeNuevaCarta = false;
      this.ultimaCarta = this.nuevaCarta;
      this.cartasService.obtenerCarta(this.nombreDeMazo);
    }, 2000);
  }
  

    // Ocultar el mensaje después de 2 segundos
    // setTimeout(() => {
    //   this.mensajeResultado = null; // Reinicia el mensaje
    //   this.existeNuevaCarta = false;
    //   this.ultimaCarta = this.nuevaCarta;
    //   this.cartasService.obtenerCarta(this.nombreDeMazo);
    // }, 2000);



  reiniciar() {
    this.puntaje = 0;
    this.existeNuevaCarta = false;
    this.cartasService.crearMazo();
    this.mensajeResultado = null; // Reinicia el mensaje
  }
}
