import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  standalone: false,
  // imports: [],
  templateUrl: './ahorcado.component.html',
  // styleUrl: './ahorcado.component.css'
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {
  words: string[] = ['ANGULAR', 'JAVASCRIPT', 'TYPESCRIPT', 'PROGRAMACION', 'AHORCADO']; // Lista de palabras
  word: string = ''; // La palabra secreta seleccionada al azar
  displayedWord: string[] = []; // El progreso de la palabra
  alphabet: string[] = []; // Letras del abecedario
  usedLetters: string[] = []; // Letras ya seleccionadas
  errors = 0; // Número de errores cometidos
  maxErrors = 6; // Máximo de errores permitidos
  gameOver = false;
  message = ''; // Mensaje de victoria o derrota
  hangmanImages: string[] = [ // Imágenes del ahorcado
    '/assets/imagenes/etapasAhorcado/ahorcado0.png',
    '/assets/imagenes/etapasAhorcado/ahorcado1.png',
    '/assets/imagenes/etapasAhorcado/ahorcado2.png',
    '/assets/imagenes/etapasAhorcado/ahorcado3.png',
    '/assets/imagenes/etapasAhorcado/ahorcado4.png',
    '/assets/imagenes/etapasAhorcado/ahorcado5.png',
    '/assets/imagenes/etapasAhorcado/ahorcado6.png'
  ];

  constructor() {
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  }

  ngOnInit() {
    this.restartGame();
  }

  // Inicializa el juego y selecciona una nueva palabra al azar
  restartGame() {
    // Selecciona una palabra al azar de la lista
    this.word = this.words[Math.floor(Math.random() * this.words.length)];
    
    // Inicializa la palabra mostrada con guiones bajos
    this.displayedWord = this.word.split('').map(() => '_');
    
    this.usedLetters = [];
    this.errors = 0;
    this.gameOver = false;
    this.message = '';
  }

  // Se ejecuta cuando se selecciona una letra
  selectLetter(letter: string) {
    if (this.gameOver) {
      return; // Si el juego terminó, no permitir más interacción
    }

    // Agrega la letra a la lista de letras usadas
    this.usedLetters.push(letter);

    // Verificar si la letra está en la palabra
    if (this.word.includes(letter)) {
      this.updateDisplayedWord(letter);
      if (this.displayedWord.join('') === this.word) {
        this.gameOver = true;
        this.message = '¡Ganaste!';
      }
    } else {
      this.errors++;
      if (this.errors >= this.maxErrors) {
        this.gameOver = true;
        this.message = '¡Perdiste! La palabra era: ' + this.word;
      }
    }
  }

  // Actualiza la palabra mostrada cuando se acierta una letra
  updateDisplayedWord(letter: string) {
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i] === letter) {
        this.displayedWord[i] = letter;
      }
    }
  }
}