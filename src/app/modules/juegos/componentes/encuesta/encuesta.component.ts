import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta',
  standalone: false,
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  encuestaForm: FormGroup;
  submitted: boolean = false;
  isLoading = false;
  completed = false;
  // submitted = false;

  // Definir lista de tipos de juegos
  juegos: string[] = ['Aventura', 'Deportes', 'Puzzle', 'Acción'];

  constructor(private fb: FormBuilder, private firestore: Firestore, private authService: AuthService, private router: Router) {
    this.encuestaForm = this.fb.group({
      nombreApellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      tipoJuegos: this.fb.array([], [this.minSelectedCheckboxes(1)]),
      juegoFavorito: ['', Validators.required],
      satisfaccion: ['', Validators.required] // Nueva validación
    });
  }

  ngOnInit() {}

  // Validador personalizado para asegurar que se seleccionen al menos 'min' checkboxes
  minSelectedCheckboxes(min: number) {
    return (control: AbstractControl) => {
      const formArray = control as FormArray;
      const totalSelected = formArray.controls.reduce((prev, curr) => curr.value ? prev + 1 : prev, 0);
      return totalSelected >= min ? null : { minSelected: true };
    };
  }

  

 
  // async enviarEncuesta() {
  //   this.submitted = true; // Indicar que el formulario ha sido enviado
  //   this.encuestaForm.markAllAsTouched(); // Marcar todos los campos como tocados
  
  //   // Verificar si el formulario es inválido
  //   if (this.encuestaForm.invalid) {
  //     return; // Si es inválido, no hacemos nada más
  //   }
  
  //   const usuarioId = this.authService.getUser()?.uid;
  
  //   if (usuarioId) {
  //     this.isLoading = true; // Mostrar el spinner
  
  //     try {
  //       const encuestasCollection = collection(this.firestore, 'encuestas');
  //       await addDoc(encuestasCollection, {
  //         ...this.encuestaForm.value,
  //         usuarioId: usuarioId,
  //         timestamp: new Date()
  //       });
  
  //       // Limpiar el formulario después de enviar
  //       this.encuestaForm.reset();
  //       this.submitted = false; // Restablecer la bandera de enviado
  
  //       // Mostrar el mensaje de encuesta completada
  //       this.completed = true;
  
  //       // Simula una espera para el spinner y el mensaje de confirmación
  //       setTimeout(() => {
  //         this.isLoading = false; // Ocultar el spinner
  //         this.completed = false; // Ocultar el mensaje de confirmación
  //         // Redirigir al home después de enviar la encuesta
  //         this.router.navigate(['/home']);
  //       }, 2000); // Espera 2 segundos antes de redirigir
  //     } catch (error) {
  //       this.isLoading = false; // Asegurarse de ocultar el spinner en caso de error
  //       console.error('Error al enviar la encuesta: ', error);
  //     }
  //   } else {
  //     // Manejar el caso en que no haya usuario logueado
  //   }
  // }
  

  async enviarEncuesta() {
    this.submitted = true; // Indicar que el formulario ha sido enviado
    this.encuestaForm.markAllAsTouched(); // Marcar todos los campos como tocados
  
    // Verificar si el formulario es inválido
    if (this.encuestaForm.invalid) {
      return; // Si es inválido, no hacemos nada más
    }
  
    const usuarioId = this.authService.getUser()?.uid;
  
    if (usuarioId) {
      this.isLoading = true; // Mostrar el spinner
  
      try {
        const encuestasCollection = collection(this.firestore, 'encuestas');
        await addDoc(encuestasCollection, {
          ...this.encuestaForm.value,
          usuarioId: usuarioId,
          timestamp: new Date()
        });
  
        // Limpiar el formulario después de enviar
        this.encuestaForm.reset();
        this.submitted = false; // Restablecer la bandera de enviado
  
        // Mostrar el mensaje de encuesta completada
        this.completed = true;
  
        // Simula una espera para el spinner y el mensaje de confirmación
        setTimeout(() => {
          this.isLoading = false; // Ocultar el spinner
          // Ya no redirigimos al home
          this.completed = true; // Mostrar el mensaje de confirmación
        }, 1000); // Espera 2 segundos antes de ocultar el spinner
      } catch (error) {
        this.isLoading = false; // Asegurarse de ocultar el spinner en caso de error
        console.error('Error al enviar la encuesta: ', error);
      }
    } else {
      // Manejar el caso en que no haya usuario logueado
    }
}


  // Método para manejar los cambios en los checkboxes
  onCheckboxChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const tipoJuegosArray = this.encuestaForm.get('tipoJuegos') as FormArray;

    if (target.checked) {
      tipoJuegosArray.push(new FormControl(target.value));
    } else {
      const index = tipoJuegosArray.controls.findIndex(control => control.value === target.value);
      tipoJuegosArray.removeAt(index);
    }
  }

  // Getter para acceder al FormArray de tipoJuegos más fácilmente
  get tipoJuegos(): FormArray {
    return this.encuestaForm.get('tipoJuegos') as FormArray;
  }
}

