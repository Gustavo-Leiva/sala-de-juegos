import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { MayorMenorComponent } from './componentes/mayor-menor/mayor-menor.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../../componentes/home/home.component';


@NgModule({
  declarations: [
    AhorcadoComponent,
    MayorMenorComponent,
    PreguntadosComponent,
    
  ],

  imports: [
    CommonModule,
    FormsModule,
    JuegosRoutingModule,
  
      
  ],

  exports: [ // Asegúrate de exportar ChatComponent aquí
    AhorcadoComponent,
    MayorMenorComponent,
    PreguntadosComponent,
  ]
  
})
export class JuegosModule { }
