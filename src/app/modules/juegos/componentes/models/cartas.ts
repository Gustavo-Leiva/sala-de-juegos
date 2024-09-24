export class Cartas {
    valor!: string;
    imagen!: string;
  
    constructor(valor:string, imagen:string){
      this.imagen = imagen;
      switch(valor){
  
        case 'JACK':
          this.valor = "11";
          break;
        case 'QUEEN':
          this.valor = "12";
          break;
        case 'KING':
          this.valor = "13";
          break;
        case 'ACE':
          this.valor = "1";
          break;
        default:
          this.valor = valor;
      }
    }
  }