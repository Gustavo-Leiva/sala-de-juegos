
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  public nombreMazo!: string;
  public ultimaCarta: Subject<string>;
  public nuevaCarta: Subject<string>;

  constructor(private http : HttpClient) {
    this.ultimaCarta = new Subject();
    this.nuevaCarta = new Subject();
  }

  private obtenerPrimerCarta(nombre: string){
    this.http.get(`https://www.deckofcardsapi.com/api/deck/${nombre}/draw/?count=2`
    ).subscribe( respuesta => {
      this.ultimaCarta.next((respuesta as any).cards[0])
      this.nuevaCarta.next((respuesta as any).cards[1])
    })
  }

  crearMazo(){
    this.http.get(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
    ).pipe(finalize( () => {
      this.obtenerPrimerCarta(this.nombreMazo);
    })).subscribe(respuesta => {
      this.nombreMazo = (respuesta as any).deck_id;
    });
  }

  obtenerCarta(nombre: string){
    this.http.get(`https://www.deckofcardsapi.com/api/deck/${nombre}/draw/?count=1`
    ).subscribe( respuesta => {
      this.nuevaCarta.next((respuesta as any).cards[0])
    })
  }
}

