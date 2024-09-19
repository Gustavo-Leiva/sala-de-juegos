import { Component, OnInit } from '@angular/core';
import { CardService, Card } from '../../../../services/card.service';

@Component({
  selector: 'app-mayor-menor',
  standalone: false,
  // imports: [],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent implements OnInit {
  
  deckId!: string; // Con '!' para indicar que será asignada más adelante
  currentCard: Card | null = null;
  nextCard: Card | null = null;
  score: number = 0;
  message: string = '';

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.cardService.createDeck().subscribe((deck) => {
      this.deckId = deck.deck_id;
      this.drawNewCards();
    });
  }


  drawNewCards(): void {
    this.cardService.drawCard(this.deckId).subscribe((card) => {
      this.currentCard = card;
      console.log('Carta actual:', card); // Para verificar que se obtiene la carta
  
      this.cardService.drawCard(this.deckId).subscribe((nextCard) => {
        this.nextCard = nextCard;
        console.log('Siguiente carta:', nextCard); // Para verificar la siguiente carta
      });
    });
  }
  

  guessHigher(): void {
    if (this.nextCard && this.currentCard) {
      if (this.nextCard.value > this.currentCard.value) {
        this.score++;
        this.message = '¡Correcto!';
      } else {
        this.message = 'Incorrecto. Inténtalo de nuevo.';
      }
      this.drawNewCards();
    }
  }


  guessLower(): void {
    if (this.nextCard && this.currentCard) {
      if (this.nextCard.value < this.currentCard.value) {
        this.score++;
        this.message = '¡Correcto!';
      } else {
        this.message = 'Incorrecto. Inténtalo de nuevo.';
      }
      this.drawNewCards();
    }
  }
  }


