import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa Firestore
import { AuthService } from './auth.service'; // Asegúrate de que tienes AuthService


@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(
    private firestore: AngularFirestore, 
    private authService: AuthService
  ) {}

  guardarEncuesta(encuestaData: any) {
    const userId = this.authService.getUser()?.uid; // Obtener el ID del usuario logueado
    const dataConUsuario = {
      ...encuestaData,
      userId: userId
    };

    // Guardar en la colección 'encuestas'
    return this.firestore.collection('encuestas').add(dataConUsuario);
  }
}
