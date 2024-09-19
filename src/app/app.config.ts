import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Importa el proveedor de HttpClient

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),  
  provideHttpClient(), // Agrega el proveedor de HttpClient 
  provideFirebaseApp(() => initializeApp({"projectId":"sala-de-juegos-a96e1","appId":"1:635748763380:web:6d51b6f42d052a3ec000a1","storageBucket":"sala-de-juegos-a96e1.appspot.com","apiKey":"AIzaSyB4idQv35qUqmayjnoCwgO6EihtommB7Dw","authDomain":"sala-de-juegos-a96e1.firebaseapp.com","messagingSenderId":"635748763380"})), 
  provideAuth(() => getAuth()), 
  provideFirestore(() => getFirestore())]
};
