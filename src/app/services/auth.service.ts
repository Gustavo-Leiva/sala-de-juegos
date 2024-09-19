import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userActive: User | null = null;

  constructor(private auth: Auth, private router: Router) {
    this.auth.onAuthStateChanged(user => {
      this.userActive = user;
    });
  }

   // Método para iniciar sesión
  async Login(email: string, password: string): Promise<void> {
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    this.userActive = result.user;
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

 

  }

