import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, onSnapshot, query } from '@angular/fire/firestore';
import { Mensaje } from '../modules/juegos/componentes/models/mensajes';
import { limit, orderBy, where } from 'firebase/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public subChat!: any;
  public mesagesCollection : Mensaje[] = [];

  constructor(public fs : Firestore, public auth : AuthService) { }
  
  agregarChat(nuevosMensaje: Mensaje) {
    const col = collection(this.fs, 'chat');
    return addDoc(col, nuevosMensaje);
  }

  
  obtenerChat() : Observable<Mensaje[]> {
    const filteredQuery = query
    (
      collection(this.fs, "chat"),
      //where('emisor', '==', 'auth.getUserEmail()'),
      orderBy('fecha', 'asc'),
      
    );
    return collectionData(filteredQuery) as Observable<Mensaje[]>
  }

 
}


