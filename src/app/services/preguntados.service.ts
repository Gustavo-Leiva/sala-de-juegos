import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {
  private apiPreguntaURL = 'https://opentdb.com/api.php?amount=30'; // API de preguntas
  private apiImagenURL = 'https://picsum.photos/200'; // API de imágenes aleatorias

  constructor(private http: HttpClient) {}

   // Método para obtener la pregunta
   obtenerPregunta(): Observable<any> {
    return this.http.get<any>(this.apiPreguntaURL);
  }

 // Método para obtener una imagen aleatoria de Unsplash
 obtenerImagen(): Observable<Blob> {
  return this.http.get(this.apiImagenURL, { responseType: 'blob' });
  }
  // Verifica si la respuesta es correcta
  verificarRespuesta(opcionSeleccionada: string, respuestaCorrecta: string): boolean {
    return opcionSeleccionada === respuestaCorrecta;
  }
}
