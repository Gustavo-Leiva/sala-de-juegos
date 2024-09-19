import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface Card {
  value: string;
  suit: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private apiUrl = 'https://deckofcardsapi.com/api/deck';

  constructor(private http: HttpClient) { }


  createDeck(): Observable<any> {
    return this.http.get(`${this.apiUrl}/new/shuffle/?deck_count=1`);
  }

  drawCard(deckId: string): Observable<Card> {
    return this.http.get<Card>(`${this.apiUrl}/${deckId}/draw/?count=1`);
  }
}


 


