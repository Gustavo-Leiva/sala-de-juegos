import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { MayorMenorComponent } from './componentes/mayor-menor/mayor-menor.component';
import { FormsModule } from '@angular/forms';
import { ResultadoComponent } from './componentes/resultado/resultado.component';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';





@NgModule({
  declarations: [
    AhorcadoComponent,
    MayorMenorComponent,
    PreguntadosComponent,
    ResultadoComponent,
    EncuestaComponent,
  
   
   
    
    
  
    
  ],

  imports: [
    CommonModule,
    FormsModule,
    JuegosRoutingModule, 
    ReactiveFormsModule, // Importa aquí
  
       
  ],

  exports: [ 
    AhorcadoComponent,
    MayorMenorComponent,
    PreguntadosComponent,
    ResultadoComponent,
   
        
    
  ]
  
})
export class JuegosModule { }
