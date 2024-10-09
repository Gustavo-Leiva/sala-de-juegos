import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, query, orderBy } from '@angular/fire/firestore';
import { Mensaje } from '../modules/juegos/componentes/models/mensajes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public fs: Firestore) { }

  agregarChat(nuevosMensaje: Mensaje) {
    const col = collection(this.fs, 'chat');
    return addDoc(col, nuevosMensaje);
  }

  obtenerChat(): Observable<Mensaje[]> {
    const filteredQuery = query(
      collection(this.fs, "chat"),
      orderBy('fecha', 'asc')
    );
    return collectionData(filteredQuery, { idField: 'id' }) as Observable<Mensaje[]>;
  }
}


