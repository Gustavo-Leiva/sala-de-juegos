import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, query, orderBy } from '@angular/fire/firestore';
import { Resultado } from '../modules/juegos/componentes/models/resultados'; // Asegúrate de tener un modelo Resultado
// import { Mensaje } from '../modules/juegos/componentes/models/mensajes';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {

  constructor(private firestore: Firestore, private authService: AuthService) {}

  
// Método para guardar el resultado
async guardarResultado(juego: string, puntaje: number): Promise<void> {
  const usuario = this.authService.getUser(); // Obtener usuario autenticado
  const fecha = new Date(); // Obtener fecha actual

  const resultado: Resultado = {
    usuario: usuario?.email || 'Invitado',
    juego: juego,
    puntaje: puntaje,
    fecha: fecha.toISOString() // O cualquier formato que desees
  };

  try {
    const col = collection(this.firestore, 'resultados');
    await addDoc(col, resultado);
    console.log('Resultado guardado exitosamente');
  } catch (error) {
    console.error('Error al guardar el resultado', error);
  }
}

 // Método para obtener resultados
 obtenerResultados(): Observable<Resultado[]> {
  const filteredQuery = query(
    collection(this.firestore, 'resultados'),
    orderBy('fecha', 'desc') // Cambia a 'asc' si el profe pide o prefieres orden ascendente
  );
  return collectionData(filteredQuery) as Observable<Resultado[]>;
}
}