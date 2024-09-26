import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore'; // Asegúrate de importar Firestore
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userActive: User | null = null;
  isLoading = false; // Indica si se está realizando el login


  constructor(public auth: Auth, private router: Router, private firestore: Firestore) {
    this.auth.onAuthStateChanged(user => {
      this.userActive = user;
    });
  }

  //  // Método para iniciar sesión
  // async Login(email: string, password: string): Promise<void> {
  //   this.isLoading = true; // Iniciar la carga
  //   try{
      
  //     const result = await signInWithEmailAndPassword(this.auth, email, password);
  //     this.userActive = result.user;
  //   }
  //   catch(error){
  //     console.error('Error al iniciar sesión:', error);
  //     throw error; // Lanza el error para que sea capturado en el componente
  //   }
  //   finally{
  //     this.isLoading = false; // Termina la carga
  //   }

  // }


   // Método para iniciar sesión
   async Login(email: string, password: string): Promise<void> {
    this.isLoading = true; // Iniciar la carga
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      this.userActive = result.user;

      // Guardar en la colección 'logins' en Firestore
      const loginsCollection = collection(this.firestore, 'logins');
      await addDoc(loginsCollection, {
        userId: result.user.uid,
        email: result.user.email,
        loginTime: new Date() // Guarda la fecha y hora del login
      });
      
      // Redirigir o hacer cualquier otra acción después del login si es necesario

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error; // Lanza el error para que sea capturado en el componente
    } finally {
      this.isLoading = false; // Termina la carga
    }
  }

  // Método para cerrar sesión
  async logout(): Promise<void> {
    await signOut(this.auth);
    this.userActive = null;
    this.router.navigate(['/home']); // Redirige al home después de cerrar sesión
  }
 
   // Método para verificar si el usuario está autenticado
   isLoggedIn(): boolean {
    return this.userActive !== null;
  }

   getUser() {
    return this.userActive;
  }

  getUserEmail(){
    return this.userActive ? this.userActive.email : null;
  }

 

}

